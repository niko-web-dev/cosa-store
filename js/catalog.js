var products = {};
var cart = {
    "total": 0,
    "items": {},
    "ids": [],
};
var productForm = 'productForm';
var $form = $(`#${productForm}`);
var $cart = $('#formCart');
jQuery(document).ready(function($){
    // инициализация | отрисовка товаров
    init('#catalogWrapper');

    // событие клика на товар в каталоге
    $('body').on('click','.showModal',function(e){
        e.preventDefault();
        
        $('#'+productForm+' .result').html(renderModal(products[$(this).data('id')]));
        $('.shop__item-popup').css('display','block');
    });

    //закрыть окно товара по клику вне окна
    $(document).mouseup(function (e) { 
        var popup = $('.result');
        if (e.target != popup[0] && popup.has(e.target).length === 0){
            $('.pupup-close').css({"display":"none"});
        }
    });

    //открыть/закрыть корзину
    // $('body').on('click', '.shopping-cart', function(){
    //     $('#formCart .result').html(showCart());
    //     $('.shop__cart-popup').css('display','block');
    // });

    // событие клика в попапе "корзина"
    // $form.on('submit', function(e){
    //     e.preventDefault();
    //     var productId = $form.find('input[name="obj"]').val();
    //     addItemToCart(productId);
    // });


    // событие оформить заказ
    // $cart.on('submit',function(e){
    //     e.preventDefault();
    //     var items = cart.items;

    //     $.ajax({
    //         url: '/ajax/send.php',
    //         type:'POST',
    //         data: items,
    //         success:function(data){
    //             console.log(data);
    //         }
    //     });
    // });

});



function init(wrapperID){
    getProductsFromJson(wrapperID, 'json/products.json')
}
function getProductsFromJson(wrapperID, source){
    $.ajax({
        url: source,
        type: 'GET',
        dataType: 'json',
        beforeSend: function(){
            $(wrapperID).css('opacity','0.35');
        },
        success:function(data){
            if(data.length > 0){
                $(wrapperID).css('opacity','1');
                $(wrapperID).html(renderCatalog(data));
            }
        }
    });
}
// добавляем товары в объект products
function addToProductsObject(obj){
    products[obj.id] = obj;
}
function renderCatalog(array){
    result = '';
    array.map(elem => {
        result += renderProduct(elem)
    });
    return result;
}
function renderProduct(item){
    addToProductsObject(item);
    return `
    <div class="shop__item">
        <a href="#" class="showModal" data-id="${item.id}">
        <div class="post ${item.category}">
            <div class="shpo__item-img">
                <img onmouseover="changeIMG(this, 'hover')" onmouseout="changeIMG(this, 'state')" class="__img__" src="image/${item.img.state}" alt="${item.name}" data-hover="${item.img.hover}" data-state="${item.img.state}"/>
            </div>
            <div class="shop__item-name"> 
                    ${item.name}
            </div>
            <div class="shop__item-subtitle">
                ${item.text}
            </div>
            <div class="shop__item-price">
                ${item.cost} руб.
            </div>
        </div>
        </a>
    </div>`;
}

function renderModal(obj, btnCart = true){
    var cartButton = `
        <button class="shop__btn defult__btn">
            Обратный звонок
        </button>
    `;
    var item = `
        <div class="product__wrap" id="item${obj.id}">
            <input type="hidden" name="obj" value="${obj.id}">
            <img class="${btnCart ? 'in-product-img' : 'in-cart-img'}" src="image/${obj.img.state}"  alt="">
            <div class="pdotuct__content">
                <h4>${obj.name}</h4>
                <p>${obj.cost} руб.</p>
                <p>${obj.text}</p>
            </div>
        </div>
    `;
    return btnCart !== false ? item + cartButton : item;
}

// function showCart(){
//     res = '';
//         for(var n = 0; n < cart.ids.length; n++){
//             res += renderModal(cart.items[cart.ids[n]], false)
//         }
//     if(cart.total > 0){
//         res += `
//             <button class="shop__btn defult__btn">
//                 Оформить заказ
//             </button>
//         `;
//     } else {
//         res += 'Корзина пуста';
//     }
//     return res;
// }

// function updateItemsCount(value, id){
//     if(value === 'plus'){
//         addItemToCart(id);
//     } else {
//         removeItemfromCart(id);
//     }
//     var num = 0;
//     if(cart.ids.indexOf(id) !== -1){
//         num = cart.items[id].count;
//     } 
//     $('#item'+id+' .count_in_modal').text(num);
// }

// function updateCartCounter(val = "undefined"){
//     if(typeof val !== 'undefined'){
//         if(val === 'plus'){
//             ++cart.total;
//         } else if (val === 'minus'){
//             if(cart.total > 0){
//                 --cart.total;
//             } else {
//                 // $('#formCart .result').html(showCart());
//             }
//         }
//     }
//     $('.__counter').html(cart.total);
// }

// function addItemToCart(id){
//     if(cart.ids.indexOf(id) !== -1){
//         ++cart.items[id].count;
//     } else {
//         pushItemToCart(id);
//     }
//     updateCartCounter('plus');
//     console.log(cart.items);
//     // $('.shop__item-popup').css('display','none');
// }



// function removeItemfromCart(id){
//     if(cart.ids.indexOf(id) !== -1){
//         if(cart.items[id].count > 1){
//             --cart.items[id].count;
//         } else {
//             cart.ids.splice(cart.ids.indexOf(id),1);
//             delete cart.items[id];
//             $('form .result #item'+id).remove();
//         }
//         updateCartCounter('minus');
//     } else {
//         $('#'+productForm+' .result').html(renderModal(cart.items, false));
//     }
//     if(cart.total < 1){
//         $('.shop__cart-popup').css('display','none');
//     }
// }

// function pushItemToCart(id){
//     var newProductObj = {};
//     newProductObj = products[id];
//     newProductObj['count'] = 1;
    
//     cart.items[id] = newProductObj;
//     cart.ids.push(id);
// }

function actionCart(e, id){
    var action = $(e).data('action');
    updateItemsCount(action, id);
}

function changeIMG(e, value){
    var dataIMG = $(e).data(value);
    $(e).attr('src','image/'+dataIMG);
}

