window.onload = function(){
  
};


(function(){ 

var images =  [
['TiM10--SCREED-FOR-FLOOR.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'tim'],
['297875_434x326.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'knauf'],
['profism.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'evrol'],
['5b1a612b00135407c412bc34c92409bb.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'bibermix'],
['4dd72a750391c448b995cac3dd2bc8f8.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'volma'],

['TiM10--SCREED-FOR-FLOOR.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'tim'],
['297875_434x326.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'knauf'],
['profism.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'evrol'],
['5b1a612b00135407c412bc34c92409bb.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'bibermix'],
['4dd72a750391c448b995cac3dd2bc8f8.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'volma'],

['TiM10--SCREED-FOR-FLOOR.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'tim'],
['297875_434x326.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'knauf'],
['profism.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'evrol'],
['5b1a612b00135407c412bc34c92409bb.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'bibermix'],
['4dd72a750391c448b995cac3dd2bc8f8.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'volma'],

['TiM10--SCREED-FOR-FLOOR.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'tim'],
['297875_434x326.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'knauf'],
['profism.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'evrol'],
['5b1a612b00135407c412bc34c92409bb.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'bibermix'],
['4dd72a750391c448b995cac3dd2bc8f8.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'volma'],

['TiM10--SCREED-FOR-FLOOR.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'tim'],
['297875_434x326.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'knauf'],
['profism.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'evrol'],
['5b1a612b00135407c412bc34c92409bb.jpg', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'bibermix'],
['4dd72a750391c448b995cac3dd2bc8f8.png', 'Шпаклевка1', 'Применяется для выравнивания стен и потолков в сухих помещениях. Наносится на кирпичные, бетонные, гипсокартонные, газоселикатные и другие основания. Оштукатуренная поверхность затирается до глянца, что исключает потребность в шпаклевании.', 'kley', 'volma'],



];
var set_product;
var firm_name = [];
var product_type = [];
var count_td = 0;
var k = 0;
var product_id = 0;

function show_product(){
  var table = document.getElementById('products');
  

  while(product_id <= images.length)
  {

        if(images[product_id][4] == firm_name)
        {
          console.log(images[product_id][4]);

          var table = document.getElementById('products_body');
          if(count_td == 0){//если это первый элемент в своем tr
            tr = document.createElement('tr');//создаем tr
            table.appendChild(tr);
            td = document.createElement('td');//создаем td и в нем товар
            td.className = 'product_item';
            td.innerHTML = '<a href="#"><img src="images/' + images[product_id][4] + '/' + images[product_id][0] + '"><p>' + images[product_id][1] + '</p><p>' + images[product_id][2] + '</p></a>';
            
            tr.appendChild(td);
            count_td++;
          }
          else if(count_td == 1)//если в tr уже есть элемент
          {
            var last_elem = table.children[table.children.length - 1];
            td = document.createElement('td');//создаем td и в нем товар
            td.className = 'product_item';
            td.innerHTML = '<a href="#"><img src="images/' + images[product_id][4] + '/' + images[product_id][0] + '"><p>' + images[product_id][1] + '</p><p>' + images[product_id][2] + '</p></a>';
            last_elem.appendChild(td);
            count_td = 0;
          }
        }
      
      
      product_id++;
    }
}
  
  //    добавление\удаление типа продуктов из списка показываемых продуктов
  set_product = function(){
    if(product_type == null)
      product_type = this.innerHTML;
    else product_type.push(this.innerHTML);
    
    
    
    if((this.getAttribute('selected') != ''))
      this.setAttribute('selected', '');
    else this.removeAttribute('selected');
    
    
    
    document.getElementById('products_escort_firm').style.opacity = '0';
    document.getElementById('products_escort_product').style.opacity = '0';
    show_product();
  };
  
  
  
  
  
  //    добавление\удаление фирмы из списка показываемых продуктов
  set_firm = function(){
    if(firm_name == null)// если критериев нет
      firm_name = this.getAttribute('firm_name');
    else if(firm_name.indexOf(this.getAttribute('firm_name')) >= 0){// если такой критерий уже есть, - удаляем его
      delete firm_name[firm_name.indexOf(this.getAttribute('firm_name'))];
    }
    else if(firm_name.indexOf(this.getAttribute('firm_name')) == - 1){// если такого критерия нет, - то добавляем
      if(firm_name.indexOf(this.getAttribute('firm_name')) == -1)
        firm_name.push(this.getAttribute('firm_name'));
    }
    console.log(firm_name);
    
    // установка параметра кнопок
    if((this.getAttribute('selected') != ''))
      this.setAttribute('selected', '');
    else this.removeAttribute('selected');
    
    document.getElementById('products_escort_firm').style.opacity = '0';
    document.getElementById('products_escort_firm').style.top = '-200px';
    document.getElementById('products_escort_product').style.opacity = '0';
    document.getElementById('products_escort_product').style.top = '-200px';
    if(this.getAttribute('selected') == '')// если кнопка активна, - вызываем функцию
      show_product();
  };
    
  
  
  
  
  // добавляем обработчик на кнопки критериев для товаров
  var li_product = document.getElementsByClassName('menu_item_product');
  var li_firm = document.getElementsByClassName('menu_item_firm');
  for (var i = 0, li_product; li_product < li_product[i]; i++)
    li_product[i].onclick = set_product;
  for (var i = 0, li_firm; li_firm < li_firm[i]; i++)
    li_firm[i].onclick = set_firm;
  
})();