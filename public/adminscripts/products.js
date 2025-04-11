        // example data
        const products = [
            { id: 1, name: 'Game 1', description: 'Description 1', category: 'Action', price: '$59.99' },
            { id: 2, name: 'Game 2', description: 'Description 2', category: 'Adventure', price: '$49.99' },
            { id: 3, name: 'Game 3', description: 'Description 3', category: 'RPG', price: '$69.99' }
        ];

        function renderProducts(products) {
            const tbody = document.querySelector("#product-list tbody");
            tbody.innerHTML = "";  // clear existing rows
            products.forEach(product => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.category}</td>
                    <td>${product.price}</td>
                    <td>
                        <button onclick="editProduct(${product.id})">Edit</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }

        function filterProducts() {
            const searchQuery = document.getElementById("search").value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchQuery) ||
                product.category.toLowerCase().includes(searchQuery)
            );
            renderProducts(filteredProducts);
        }

        function editProduct(productId) {
            // redirect
            location.href = `product-edit.html?id=${productId}`;
        }

        function deleteProduct(productId) {
           
            alert(`Product ${productId} deleted`);
        
        }

       
        renderProducts(products);