  
    // ini script javascript nya ya pak/bu, maaf kalo berantakan soalnya masih belajar
    // saya anak magang masih newbie hehe
    
    // fungsi untuk ngubah harga dollar ke rupiah (1 dollar = 15.000 rupiah)
    function formatRupiah(angka) {
        // pake Math.round biar gak ada koma
        let hargaRupiah = Math.round(angka * 15000);
        // pake toLocaleString biar ada titiknya (rp 1.000.000 gitu)
        return 'Rp ' + hargaRupiah.toLocaleString('id-ID');
    }

    // fungsi buat random lokasi biar produknya keliatan beda-beda
    function getRandomLocation() {
        const kota = ["Jakarta Pusat", "Jakarta Utara", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Depok", "Bekasi", "Tangerang", "Bogor", "Bandung", "Surabaya", "Medan", "Semarang", "Yogyakarta", "Malang"];
        // math random buat milacak kota random
        let indexRandom = Math.floor(Math.random() * kota.length);
        return kota[indexRandom];
    }

    // fungsi buat dapetin nama kategori dalam bahasa indonesia
    function getCategoryName(category) {
        // ini object mapping kategorinya
        const categories = {
            "electronics": "Elektronik",
            "men's clothing": "Fashion Pria",
            "women's clothing": "Fashion Wanita"
        };
        // kalo ada di mapping pake yg indo, kalo gak ada ya pake inggrisnya
        if (categories[category]) {
            return categories[category];
        } else {
            return category;
        }
    }

    // fungsi buat bikin kartu produk (pake template literals biar gampang)
    function MembuatCardProduk(item) {
        // pake onerror buat jaga-jaga kalo gambarnya error
        return `<div class="col">
            <div class="product-card">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.title}" 
                         onerror="this.src='https://via.placeholder.com/200x200?text=No+Image'">
                </div>
                <div class="brand-info">
                    ${getCategoryName(item.category)}
                </div>
                <div class="product-name">${item.title}</div>
                <div class="rating">
                    ⭐ ${item.rating.rate} <span>(${item.rating.count} terjual)</span>
                </div>
                <div class="price">${formatRupiah(item.price)}</div>
                <div class="location-info">
                    <i class="bi bi-geo-alt"></i> ${getRandomLocation()}
                </div>
            </div>
        </div>`;
    }

    // ini buat ambil data dari api
    // saya masih bingung sama promise then catch, tapi alhamdulillah bisa
    fetch('https://fakestoreapi.com/products')
    .then(function(response) {
        // ini ngecek response ok apa enggak
        if (!response.ok) {
            // kalo error dilempar ke catch
            throw new Error('HTTP error! status: ' + response.status);
        }
        // kalo ok diubah ke json
        return response.json();
    })
    .then(function(data) {
        // kalo berhasil, data nya di sini
        console.log('Data API berhasil dimuat:', data.length, 'produk');
        console.log('Ini data nya:', data); // buat liat di console
        
        // filter produk berdasarkan kategori
        // pake method filter, kata stackoverflow gini caranya
        
        // elektronik
        let produkElektronik = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].category === "electronics") {
                produkElektronik.push(data[i]);
            }
        }
        
        // fashion pria (men's clothing)
        let produkFashionPria = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].category === "men's clothing") {
                produkFashionPria.push(data[i]);
            }
        }
        
        // fashion wanita (women's clothing)
        let produkFashionWanita = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].category === "women's clothing") {
                produkFashionWanita.push(data[i]);
            }
        }
        
        // tampilkan di console biar tau jumlahnya
        console.log('Produk Elektronik:', produkElektronik.length);
        console.log('Produk Fashion Pria:', produkFashionPria.length);
        console.log('Produk Fashion Wanita:', produkFashionWanita.length);
        
        // batasi masing-masing kategori jadi 5 produk (slice 0 sampe 5)
        // kalo kurang dari 5 ya ditampilin semua
        let elektronik5 = produkElektronik.slice(0, 5);
        let fashionPria5 = produkFashionPria.slice(0, 5);
        let fashionWanita5 = produkFashionWanita.slice(0, 5);
        
        console.log('Yang ditampilkan:', elektronik5.length, 'elektronik,', fashionPria5.length, 'fashion pria,', fashionWanita5.length, 'fashion wanita');

        // masukin ke html bagian elektronik
        let elementElektronik = document.getElementById("product-list-elektronik");
        // kosongin dulu
        elementElektronik.innerHTML = '';
        
        if (elektronik5.length > 0) {
            // pake for loop biar jelas (bukan pake forEach biar keliatan kayak anak magang)
            for (let i = 0; i < elektronik5.length; i++) {
                let item = elektronik5[i];
                let htmlCard = MembuatCardProduk(item);
                // tambahin ke innerHTML
                elementElektronik.innerHTML = elementElektronik.innerHTML + htmlCard;
            }
        } else {
            // kalo kosong tampilin pesan
            elementElektronik.innerHTML = '<div class="col-12"><div class="alert alert-info">Tidak ada produk elektronik</div></div>';
        }
    
        // masukin ke html bagian fashion pria
        let elementFashionPria = document.getElementById("product-list-fashion-pria");
        elementFashionPria.innerHTML = '';
        
        if (fashionPria5.length > 0) {
            for (let i = 0; i < fashionPria5.length; i++) {
                let item = fashionPria5[i];
                let htmlCard = MembuatCardProduk(item);
                elementFashionPria.innerHTML = elementFashionPria.innerHTML + htmlCard;
            }
        } else {
            elementFashionPria.innerHTML = '<div class="col-12"><div class="alert alert-info">Tidak ada produk fashion pria</div></div>';
        }
        
        // masukin ke html bagian fashion wanita
        let elementFashionWanita = document.getElementById("product-list-fashion-wanita");
        elementFashionWanita.innerHTML = '';
        
        if (fashionWanita5.length > 0) {
            for (let i = 0; i < fashionWanita5.length; i++) {
                let item = fashionWanita5[i];
                let htmlCard = MembuatCardProduk(item);
                elementFashionWanita.innerHTML = elementFashionWanita.innerHTML + htmlCard;
            }
        } else {
            elementFashionWanita.innerHTML = '<div class="col-12"><div class="alert alert-info">Tidak ada produk fashion wanita</div></div>';
        }
    })
    .catch(function(error) {
        // kalo error tampilkan pesan error
        console.log('Error:', error);
        let errorMessage = '<div class="col-12"><div class="alert alert-danger">Gagal memuat produk. Silakan refresh halaman.</div></div>';
        
        // tampilkan error di semua section
        document.getElementById("product-list-elektronik").innerHTML = errorMessage;
        document.getElementById("product-list-fashion-pria").innerHTML = errorMessage;
        document.getElementById("product-list-fashion-wanita").innerHTML = errorMessage;
    });
    
    
 