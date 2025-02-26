//User Area update
//WELCOME TO ZENOFY!
/*Zenofy specializes in providing top-tier projectors, projector screens, and related 
                    accessories, catering to both home entertainment enthusiasts and professionals seeking 
                    superior visual solutions for presentations, classrooms, and conference rooms. Our products 
                    are designed to deliver exceptional image clarity, brightness, and durability, ensuring an 
                    immersive and reliable experience for all your projection needs.*/
                    let topicDisplay = document.getElementById('topic');
                    let desDisplay = document.getElementById('description');
                    let topicUpdate = document.getElementById('home-title');
                    let desUpdate = document.getElementById('home-description');
                    let formUpdate = document.getElementById('home-form');
                    
                    async function loadHomeContent() {
                        try {
                            const response = await fetch('api/getHomeContent');
                            if (!response.ok) {
                                throw new Error('Failed to fetch home content');
                            }
                            const data = await response.json();
                            topicDisplay.innerHTML = data.title || "Default Title";
                            desDisplay.innerHTML = data.description || "Default Description";
                        } catch (error) {
                            console.error('Error loading content:', error);
                        }
                    }
                    
                    loadHomeContent();
                    
                    formUpdate.addEventListener('submit', async function (e) {
                        e.preventDefault();
                        const newTitle = topicUpdate.value;
                        const newDes = desUpdate.value;
                        try {
                            const response = await fetch('/api/updateHomeContent', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    title: newTitle,
                                    description: newDes
                                })
                            });
                            if (response.ok) {
                                alert("Home page content updated successfully.");
                                loadHomeContent(); // Reload the content after updating
                            } else {
                                alert("Failed to update content");
                            }
                        } catch (error) {
                            console.error('Error updating content:', error);
                            alert("An error occurred while updating content.");
                        }
                    });
                    