    function searchGame() {
        var searchTerm = document.getElementById("search").value.trim(); 

        if (searchTerm) {
            window.location.href = "products.html?search=" + encodeURIComponent(searchTerm);
        } else {
            window.location.href = "products.html"; 
        }
    }
