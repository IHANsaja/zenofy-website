import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import logo from '../assets/logo.png';
import './Dashboard.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('analytics');

    // --- Category State Management ---
    const defaultCategories = [
        { id: 'cat1', name: 'Projector Screens', description: 'Various types of projector screens' },
        { id: 'cat2', name: 'Projector Accessories', description: 'Mounts, stands, and cables' }
    ];

    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('zenofy_categories');
        return saved ? JSON.parse(saved) : defaultCategories;
    });

    const [isEditingCat, setIsEditingCat] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<any>(null);
    const [catFormData, setCatFormData] = useState({ name: '', description: '' });

    useEffect(() => {
        localStorage.setItem('zenofy_categories', JSON.stringify(categories));
    }, [categories]);

    // --- Product State Management ---
    const initialProducts = [
        { id: 1, img: 'https://images.unsplash.com/photo-1593359677879-14ff9d56508d?auto=format&fit=crop&q=80&w=400', name: 'Elite Series 4K Projector', category: 'Projector Screens', price: 1250, details: 'A high-end 4K projector for home cinema.' },
        { id: 2, img: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=400', name: 'Manual Wall Mount Projector Screen', category: 'Projector Screens', price: 450, details: 'A durable manual screen.' },
        { id: 3, img: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=400', name: 'Electric Wall Mount Projector Screen', category: 'Projector Screens', price: 950, details: 'Motorized high-quality screen.' },
        { id: 4, img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400', name: 'Projector Stand', category: 'Projector Accessories', price: 120, details: 'Adjustable projector stand.' },
        { id: 5, img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=400', name: 'Projector Brackets', category: 'Projector Accessories', price: 85, details: 'Ceiling mount brackets.' },
    ];

    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('zenofy_products');
        return saved ? JSON.parse(saved) : initialProducts;
    });

    const [isEditingProd, setIsEditingProd] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<any>(null);
    const [prodFormData, setProdFormData] = useState({ name: '', category: '', img: '', price: 0, details: '' });

    // --- Sales State Management ---
    const [monthlySales, setMonthlySales] = useState(() => {
        const saved = localStorage.getItem('zenofy_monthly_sales');
        return saved ? JSON.parse(saved) : [
            { id: 1, month: 'January', units: 45, income: 45000 },
            { id: 2, month: 'February', units: 52, income: 57800 },
            { id: 3, month: 'March', units: 0, income: 0 },
            { id: 4, month: 'April', units: 0, income: 0 },
            { id: 5, month: 'May', units: 0, income: 0 },
            { id: 6, month: 'June', units: 0, income: 0 },
        ];
    });

    useEffect(() => {
        localStorage.setItem('zenofy_monthly_sales', JSON.stringify(monthlySales));
    }, [monthlySales]);

    useEffect(() => {
        localStorage.setItem('zenofy_products', JSON.stringify(products));
    }, [products]);

    // --- Handlers ---
    const handleAddCategory = () => {
        if (!catFormData.name) return;
        const newCat = { id: `cat-${Date.now()}`, ...catFormData };
        setCategories([...categories, newCat]);
        setIsEditingCat(false);
        setCatFormData({ name: '', description: '' });
    };

    const handleUpdateCategory = () => {
        setCategories(categories.map((c: any) => c.id === currentCategory.id ? { ...c, ...catFormData } : c));
        setIsEditingCat(false);
        setCurrentCategory(null);
        setCatFormData({ name: '', description: '' });
    };

    const handleDeleteCategory = (id: string) => {
        if (window.confirm('Deleting this category will not delete its products, but they might not show up in the shop properly. Continue?')) {
            setCategories(categories.filter((c: any) => c.id !== id));
        }
    };

    const handleAddProduct = () => {
        if (!prodFormData.name || !prodFormData.category) return;
        const newProduct = { id: Date.now(), ...prodFormData };
        setProducts([...products, newProduct]);
        setIsEditingProd(false);
        setProdFormData({ name: '', category: '', img: '', price: 0, details: '' });
    };

    const handleUpdateProduct = () => {
        setProducts(products.map((p: any) => p.id === currentProduct.id ? { ...p, ...prodFormData } : p));
        setIsEditingProd(false);
        setCurrentProduct(null);
        setProdFormData({ name: '', category: '', img: '', price: 0, details: '' });
    };

    const handleUpdateSales = (id: number, field: 'units' | 'income', value: string) => {
        const numVal = parseFloat(value) || 0;
        setMonthlySales(monthlySales.map((s: any) => s.id === id ? { ...s, [field]: numVal } : s));
    };

    const handleDeleteProduct = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter((p: any) => p.id !== id));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProdFormData({ ...prodFormData, img: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const openEditProd = (product: any) => {
        setIsEditingProd(true);
        setCurrentProduct(product);
        setProdFormData({
            name: product.name,
            category: product.category,
            img: product.img,
            price: product.price || 0,
            details: product.details || ''
        });
    };

    const openEditCat = (category: any) => {
        setIsEditingCat(true);
        setCurrentCategory(category);
        setCatFormData({ name: category.name, description: category.description || '' });
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=400';
    };

    // --- Chart Data (Derived from monthlySales) ---
    const incomeData = {
        labels: monthlySales.map((s: any) => s.month),
        datasets: [
            {
                label: 'Monthly Income (LKR)',
                data: monthlySales.map((s: any) => s.income),
                borderColor: '#FDBE33',
                backgroundColor: 'rgba(253, 190, 51, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const salesData = {
        labels: monthlySales.map((s: any) => s.month),
        datasets: [
            {
                label: 'Monthly Sales (Units)',
                data: monthlySales.map((s: any) => s.units),
                backgroundColor: '#FDBE33',
                borderRadius: 8,
            },
        ],
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="hp1">
                    <img src={logo} alt="logo" height="40px" width="40px" onError={handleImageError} />
                    <h2>ZENOFY ADMIN</h2>
                </div>
                <div className="hp2">
                    <p>Welcome admin123!</p>
                    <div className="usericon-container">
                        <i className="ri-user-6-fill"></i>
                    </div>
                </div>
            </header>

            <div className="dashboard-main">
                <aside className="sidebar">
                    <ul>
                        <li className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
                            <i className="ri-dashboard-horizontal-fill"></i><p>Analytics</p>
                        </li>
                        <li className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>
                            <i className="ri-list-settings-line"></i><p>Categories</p>
                        </li>
                        <li className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
                            <i className="ri-box-1-fill"></i><p>Products</p>
                        </li>
                        <li className={activeTab === 'userArea' ? 'active' : ''} onClick={() => setActiveTab('userArea')}>
                            <i className="ri-file-user-fill"></i><p>User Area</p>
                        </li>
                    </ul>
                    <button className="logout-btn plain-admin-logout" onClick={() => window.location.href = '/login'} title="Log Out">
                        <i className="ri-logout-box-r-line"></i>
                    </button>
                </aside>

                <main className="main-content">
                    {activeTab === 'analytics' && (
                        <div className="tab-content">
                            <h2>Analytics</h2>
                            <div className="stats">
                                <div className="stat-item">
                                    <i className="ri-archive-stack-fill"></i>
                                    <div className="stat-text">
                                        <h3>Total Products sold</h3>
                                        <p>{monthlySales.reduce((acc: number, s: any) => acc + s.units, 0)}</p>
                                    </div>
                                </div>
                                <div className="stat-item">
                                    <i className="ri-team-fill"></i>
                                    <div className="stat-text"><h3>New clients</h3><p>410</p></div>
                                </div>
                                <div className="stat-item-reverse">
                                    <i className="ri-money-dollar-circle-fill"></i>
                                    <div className="stat-text">
                                        <h3>Total Earnings</h3>
                                        <p>LKR {monthlySales.reduce((acc: number, s: any) => acc + s.income, 0).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="charts">
                                <div className="chart-container"><h3>Daily Income</h3><Line data={incomeData} /></div>
                                <div className="chart-container"><h3>Sales Analysis</h3><Bar data={salesData} /></div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'categories' && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>Category Management</h2>
                                <button className="add-btn" onClick={() => { setIsEditingCat(true); setCurrentCategory(null); setCatFormData({ name: '', description: '' }); }}>
                                    <i className="ri-add-line"></i> Add Category
                                </button>
                            </div>

                            {isEditingCat && (
                                <div className="admin-modal-overlay">
                                    <div className="admin-modal">
                                        <h3>{currentCategory ? 'Edit Category' : 'Add New Category'}</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Category Name</label>
                                                <input type="text" value={catFormData.name} onChange={(e) => setCatFormData({ ...catFormData, name: e.target.value })} placeholder="e.g. Cars" />
                                            </div>
                                            <div className="form-group">
                                                <label>Details / Description</label>
                                                <textarea value={catFormData.description} onChange={(e) => setCatFormData({ ...catFormData, description: e.target.value })} placeholder="Category details..." rows={3} />
                                            </div>
                                        </div>
                                        <div className="modal-actions">
                                            <button className="cancel-btn" onClick={() => setIsEditingCat(false)}>Cancel</button>
                                            <button className="save-btn" onClick={currentCategory ? handleUpdateCategory : handleAddCategory}>{currentCategory ? 'Update' : 'Add'}</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="categories-list">
                                {categories.map((cat: any) => (
                                    <div key={cat.id} className="category-item">
                                        <div className="cat-info">
                                            <h3>{cat.name}</h3>
                                            <p>{cat.description}</p>
                                        </div>
                                        <div className="cat-actions">
                                            <button className="edit-btn" onClick={() => openEditCat(cat)}><i className="ri-edit-line"></i></button>
                                            <button className="delete-btn" onClick={() => handleDeleteCategory(cat.id)}><i className="ri-delete-bin-line"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>Product Management</h2>
                                <button className="add-btn" onClick={() => { setIsEditingProd(true); setCurrentProduct(null); setProdFormData({ name: '', category: '', img: '', price: 0, details: '' }); }}>
                                    <i className="ri-add-line"></i> Add Product
                                </button>
                            </div>

                            {isEditingProd && (
                                <div className="admin-modal-overlay">
                                    <div className="admin-modal">
                                        <h3>{currentProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Product Name</label>
                                                <input type="text" value={prodFormData.name} onChange={(e) => setProdFormData({ ...prodFormData, name: e.target.value })} placeholder="e.g. Benz" />
                                            </div>
                                            <div className="form-group">
                                                <label>Category</label>
                                                <select value={prodFormData.category} onChange={(e) => setProdFormData({ ...prodFormData, category: e.target.value })}>
                                                    <option value="">Select Category</option>
                                                    {categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Product Details</label>
                                                <textarea value={prodFormData.details} onChange={(e) => setProdFormData({ ...prodFormData, details: e.target.value })} placeholder="Detailed description..." rows={3} />
                                            </div>
                                            <div className="form-group">
                                                <label>Price (LKR)</label>
                                                <input type="number" value={prodFormData.price} onChange={(e) => setProdFormData({ ...prodFormData, price: parseFloat(e.target.value) || 0 })} placeholder="e.g. 1250" />
                                            </div>
                                            <div className="form-group">
                                                <label>Image</label>
                                                <input type="file" onChange={handleImageUpload} />
                                                {prodFormData.img && <img src={prodFormData.img} alt="Preview" className="img-preview" />}
                                            </div>
                                        </div>
                                        <div className="modal-actions">
                                            <button className="cancel-btn" onClick={() => setIsEditingProd(false)}>Cancel</button>
                                            <button className="save-btn" onClick={currentProduct ? handleUpdateProduct : handleAddProduct}>{currentProduct ? 'Update' : 'Add'}</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="admin-products-grid">
                                {products.map((item: any) => (
                                    <div key={item.id} className="shop-product-card admin-card">
                                        <div className="shop-img-box"><img src={item.img} alt={item.name} onError={handleImageError} /></div>
                                        <h3>{item.name}</h3>
                                        <p className="product-category">{item.category}</p>
                                        <p className="product-price-admin">LKR {item.price?.toLocaleString() || 0}</p>
                                        <p className="product-details-preview">{item.details?.substring(0, 50)}...</p>
                                        <div className="admin-actions">
                                            <button className="edit-btn" onClick={() => openEditProd(item)}><i className="ri-edit-line"></i></button>
                                            <button className="delete-btn" onClick={() => handleDeleteProduct(item.id)}><i className="ri-delete-bin-line"></i></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'userArea' && (
                        <div className="tab-content">
                            <div className="tab-header">
                                <h2>User Area - Manual Sales Tracking</h2>
                            </div>
                            <div className="sales-data-table-container">
                                <table className="sales-table">
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Units Sold</th>
                                            <th>Income (LKR)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {monthlySales.map((s: any) => (
                                            <tr key={s.id}>
                                                <td>{s.month}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="admin-input"
                                                        value={s.units}
                                                        onChange={(e) => handleUpdateSales(s.id, 'units', e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="admin-input"
                                                        value={s.income}
                                                        onChange={(e) => handleUpdateSales(s.id, 'income', e.target.value)}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="product-monthly-details">
                                <h3>Product Details per Month</h3>
                                <div className="monthly-details-grid">
                                    {monthlySales.filter((s: any) => s.units > 0).map((s: any) => (
                                        <div key={s.id} className="monthly-detail-card">
                                            <h4>{s.month}</h4>
                                            <p><strong>Total Units:</strong> {s.units}</p>
                                            <p><strong>Total Revenue:</strong> LKR {s.income.toLocaleString()}</p>
                                            <div className="mini-product-list">
                                                <span>Top: {products[0]?.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
