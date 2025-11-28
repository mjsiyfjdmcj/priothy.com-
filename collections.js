const collectionsData = {
    dilruba: [
        { name: 'Bridal Elegance', price: 'Rs.15,990', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop', badge: 'New' },
        { name: 'Royal Wedding', price: 'Rs.18,500', img: 'https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?w=500&h=600&fit=crop', badge: 'Sale' },
        { name: 'Golden Dreams', price: 'Rs.16,800', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&h=600&fit=crop', badge: 'Hot' },
        { name: 'Pearl Luxury', price: 'Rs.14,200', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop', badge: 'New' },
        { name: 'Diamond Shine', price: 'Rs.19,999', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&h=600&fit=crop', badge: 'Sale' },
        { name: 'Silk Romance', price: 'Rs.13,500', img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&h=600&fit=crop', badge: 'Hot' }
    ],
    evoke: [
        { name: 'Summer Breeze', price: 'Rs.5,990', img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop', badge: 'Sale' },
        { name: 'Floral Paradise', price: 'Rs.6,490', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=600&fit=crop', badge: 'New' },
        { name: 'Pastel Dreams', price: 'Rs.5,500', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop', badge: 'Hot' },
        { name: 'Spring Bloom', price: 'Rs.6,200', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=600&fit=crop', badge: 'Sale' },
        { name: 'Tropical Vibes', price: 'Rs.5,800', img: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=600&fit=crop', badge: 'New' },
        { name: 'Sunset Glow', price: 'Rs.6,990', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&h=600&fit=crop', badge: 'Hot' }
    ],
    korina: [
        { name: 'Premium Print 1', price: 'Rs.7,990', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&h=600&fit=crop', badge: 'New' },
        { name: 'Premium Print 2', price: 'Rs.8,490', img: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=500&h=600&fit=crop', badge: 'Sale' },
        { name: 'Premium Print 3', price: 'Rs.7,500', img: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=500&h=600&fit=crop', badge: 'Hot' },
        { name: 'Premium Print 4', price: 'Rs.8,200', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&h=600&fit=crop', badge: 'New' },
        { name: 'Premium Print 5', price: 'Rs.7,800', img: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=500&h=600&fit=crop', badge: 'Sale' },
        { name: 'Premium Print 6', price: 'Rs.8,990', img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&h=600&fit=crop', badge: 'Hot' }
    ]
};

document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', function() {
        const collection = this.dataset.collection;
        const products = collectionsData[collection];
        const container = document.querySelector('.collection-products-grid');
        
        container.innerHTML = '';
        
        products.forEach((product, index) => {
            const productCard = `
                <div class="collection-product-card" style="animation-delay: ${index * 0.1}s">
                    <div class="collection-product-image">
                        <img src="${product.img}" alt="${product.name}">
                        <span class="collection-sale-badge">${product.badge}</span>
                    </div>
                    <div class="collection-product-info">
                        <h4>${product.name}</h4>
                        <div class="collection-product-price">
                            <span class="new-price">${product.price}</span>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });
        
        const collectionProducts = document.querySelector('.collection-products');
        collectionProducts.style.display = 'block';
        collectionProducts.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        setTimeout(() => {
            document.querySelectorAll('.collection-product-card').forEach(pCard => {
                pCard.classList.add('animate');
            });
        }, 300);
    });
});
