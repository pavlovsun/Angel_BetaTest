class Products {
    constructor() {
        this.classNameActive = 'products-element__btn_active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
    }

    handleSetLocationStorage(element, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id);
        
        if (pushProduct) {
            element.classList.add(this.classNameActive);
            element.innerHTML = this.labelRemove;
        } else {
            element.classList.remove(this.classNameActive);
            element.innerHTML = this.labelAdd;
        }
        headerPage.render(products.length);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';

        CATALOG.forEach(({ id, name, price, img, quantity}) => {
            let activeClass = '';
            let activeText = '';

            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' '+this.classNameActive;
                activeText = this.labelRemove;
            }


            htmlCatalog += `
            <li class="products-element">
                <span class="products-element__name">${name}</span>
                <img  class="products-element__img" src="${img}"/>

                <span class="products-element__quantity"><button class="btn-sub" type="button">-</button>
                <input class="btn-input" type="text" name="field" value="${quantity}" />
                <button class="btn-sum" type="button">+</button></span>

                <span class="products-element__price">💄 ${price.toLocaleString()} RUB</span>
                <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">
                ${activeText}
                </button>
            </li>
            `;
        })

            document.addEventListener('click', function (e) {
                if (e.target.classList.contains("btn-sum")) {
                    ++e.target.parentElement.querySelector("input").value;
                } else if (e.target.classList.contains("btn-sub")) {
                    --e.target.parentElement.querySelector("input").value;
                }
            })

        const html = `
            <ul class="products-contanier">
                ${htmlCatalog}
            </ul>
        `;

        ROOT_PRODUCTS.innerHTML = html;
    }
}
const productsPage = new Products();
productsPage.render();
/* img fix
<picture>
    <source srcset="img/СЕРЕБРИСТЫЙ ШАМПУНЬ ДЛЯ ХОЛОДНЫХ ОТТЕНКОВ БЛОНД ESTEL PRIMA BLONDE.webp">
    <img src="СЕРЕБРИСТЫЙ ШАМПУНЬ ДЛЯ ХОЛОДНЫХ ОТТЕНКОВ БЛОНД ESTEL PRIMA BLONDE.png" alt="">
</picture> */