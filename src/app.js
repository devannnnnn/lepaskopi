document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'robusta brazil', img: '1.jpg', price: 20000 },
            { id: 2, name: 'Taro Latte Art', img: '2.jpg', price: 25000 },
            { id: 3, name: 'Latte Art Original', img: '3.jpg', price: 30000 },
            { id: 4, name: 'Strawberry Squash', img: '4.jpg', price: 35000 },
            { id: 5, name: 'Matcha Latte Art', img: '5.jpg', price: 25000 },
        ],
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newitem) {
            // cek apakah ada barang yang sama di cart
            const cartitem = this.items.find((item) => item.id === newitem.id);

            // jika belum ada / cart masih kosong
            if(!cartitem) {
                this.items.push({...newitem, quantity: 1, total: newitem.price});
                this.quantity++;
                this.total += newitem.price;
            } else {
                // jika barang sudah ada di cart, cek apakah barang beda atau sama dengan yang di cart
                this.items = this.items.map((item) => {
                    // jika barang beda 
                    if(item.id !== newitem.id) {
                        return item;
                    } else {
                        // jika barang sudah ada di cart, maka tambahkan quantity dan total
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                })
            }
        },
        remove(id) {
            // ambil item yang akan dihapus berdasarkan id
            const cartitem = this.items.find((item) => item.id === id);

            //jika item lebih dari 1, maka kurangi quantity dan total 
            if (cartitem.quantity > 1) {
                // telusuri satu satu
                this.items = this.items.map((item) => {
                    // jika barang bukan yang di klik 
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;

                    }
                })
            } else if (cartitem.quantity === 1) {
                // jika item hanya 1, maka hapus item
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartitem.price;
            }
        }
    });
});

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
};