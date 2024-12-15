const canvas = document.getElementById('postCanvas');
const ctx = canvas.getContext('2d');

const imageInput = document.getElementById('imageUpload');
const userNameInput = document.getElementById('userName');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Path to your blood donation template
const templatePath = 'assets/template.png';

const templateImage = new Image();
templateImage.src = templatePath;

templateImage.onload = () => {
    ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height); // Draw background
};

// Event Listener for Generate Button
generateBtn.addEventListener('click', () => {
    document.getElementById("postCanvas").style.display = 'block';
    // Clear and redraw the template
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

    // Get the uploaded image
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const userImage = new Image();
            userImage.src = e.target.result;
            userImage.onload = () => {
                // Draw the uploaded image in a circle
                const centerX = 575; // X position for center of circle
                const centerY = 780; // Y position for center of circle
                const radius = 195;   // Circle radius

                ctx.save();
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(userImage, centerX - radius, centerY - radius, radius * 2, radius * 2);
                ctx.restore();

                // Draw the user's name below the circle
                ctx.font = 'bold 34px Arial';
                ctx.fillStyle = 'green';
                ctx.textAlign = 'center';
                ctx.fillText(userNameInput.value || 'Your Name Here', centerX, centerY + 273);

                
                const link = document.createElement('a'); // Create a temporary link element
                link.download = 'custom_blood_donation_post.png'; // File name for the download
                link.href = canvas.toDataURL('image/png'); // Convert canvas content to image data
                link.click(); // Trigger the download
            };
        };
        reader.readAsDataURL(file);


        document.getElementById("postCanvas").style.display = 'none';

    } else {
        alert('Please upload an image.');
    }
});

