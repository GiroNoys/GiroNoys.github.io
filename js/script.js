window.onload = function(){
  
};


(function(){ 

var images =  [
['TiM10--SCREED-FOR-FLOOR.png', 'Шпаклевка', 'kley', 'knauf'],
['TiM26--cement-plaster-facade.png', 'Цемент', 'kley', 'knauf'],
['TiM26--cement-plaster-facade.png', 'Цемент', 'kley', 'tim'],
['TiM26--cement-plaster-facade.png', 'Цемент', 'kley', 'tism'],
['TiM31--tile-adhesive-STANDARD.png', 'Шпаклевка', 'kley', 'Тим'],
['TiM--42-facade-putty-grey.png', 'Шпаклsевка', 'nekley', 'tism'],
['5.jpg', 'Шпаклевка', 'kley', 'knauf'],
['6.jpg', 'Шпаклевка', 'nekley', 'tim'],
['7.jpg', 'Шпаклевка', 'kley', 'tim'],
];
var set_product;
var firm_name = [];
var product_type = [];
var count_td = 0;
var k;


function show_product(){
  var table = document.getElementById('products');
  table.style.opacity = '1';

  
  
  for(var i = 0; i < 7; i++)
    for(var j = 0; j < 4; j++)
    {
      k = firm_name.length;
      if(images[i][3] == firm_name[k - 1])
      {
        console.log(firm_name[k-1]);
        var table = document.getElementById('products_body');
        if(count_td == 0){
          tr = document.createElement('tr');
          table.appendChild(tr);
          
          td = document.createElement('td');
          td.className = 'product_item';
          td.innerHTML = '<a href="#"><img src="images/' + images[i][3] + '/' + images[i][0] + '"><p>' + images[i][1] + '</p></a>';
          
          tr.appendChild(td);
          count_td++;
        }
        else if(count_td == 1)
        {
          var last_elem = table.children[table.children.length - 1];
          td = document.createElement('td');
          td.className = 'product_item';
          td.innerHTML = '<a href="#"><img src="images/' + images[i][3] + '/' + images[i][0] + '"><p>' + images[i][1] + '</p></a>';
          last_elem.appendChild(td);
          count_td = 0;
        }
      }
    }
}

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
  
  
  
  set_firm = function(){
    if(firm_name == null)
      firm_name = this.getAttribute('firm_name');
    else 
    {
      if(firm_name.indexOf(this.getAttribute('firm_name')) == -1)
        firm_name.push(this.getAttribute('firm_name'));
    }
    console.log(firm_name);

    
    if((this.getAttribute('selected') != ''))
      this.setAttribute('selected', '');
    else this.removeAttribute('selected');
    
    document.getElementById('products_escort_firm').style.opacity = '0';
    document.getElementById('products_escort_product').style.opacity = '0';
    if(this.getAttribute('selected') == '')
      show_product();
  };
    
  
  
  var li_product = document.getElementsByClassName('menu_item_product');
  var li_firm = document.getElementsByClassName('menu_item_firm');
  for (var i = 0, li_product; li_product < li_product[i]; i++)
    li_product[i].onclick = set_product;
  for (var i = 0, li_firm; li_firm < li_firm[i]; i++)
    li_firm[i].onclick = set_firm;
  
})();