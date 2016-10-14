(function ($) {
/*
Слайдер AIT v1.5.1
� азработка ООО "АИТ", http://ait-web.ru
*/
$.fn.aitsl = function(options) {
	var s = $(this).data('aitsl');
	if (!(typeof s === 'object')) {
			var defaults = $.extend({
				//кол-во активных элементов
				visibleItems : 1,
				//скорость анимации
				animationSpeed : 400,
				//автоматическое листание
				autoPlay : false,
				//таймаут смены кадров
				autoPlaySpeed : 3000,
				//автоматический resize слайдера
				autoResize: false,
				//обрабатывать события нажатия на меню навигации
				processingButtonsNav: true,
				//обрабатывать события нажатия на кнопки влево/вправо
				processingButtonsList: true,
				//создать меню навигации внутри/снаружи/не создавать - inside/outside/none
				createNavButtons: "inside",
				//создать кнопки внутри/снаружи/не создавать - inside/outside/none
				createListButtons: "inside",
				//включить адаптацию кол-ваvisibleItems под разрешения
				enableResponsiveBreakpoints : false,
				//эффект смены кадра
				effectOfPaging: "list",
				//номер первого активного кадра
				firstActiveItem: 1,
				//кол-во кадров при автоматическом листании
				autoPlayCount: 1,
				//направления листания auto/left/right
				autoPlayDirection: "auto",
				//содержание кнопки left
				LeftListButtonsContent: '<a href="#" class="nbs-aitsl-nav-left"></a>',
				//содержание кнопки right
				RightListButtonsContent: '<a href="#" class="nbs-aitsl-nav-right"></a>',
				//скрывать крайние кнопки (при autoplay==false) 
				autoHideListButton: true,
				//пауза при наведении (при autoplay) 
				pauseOnHover: true,
				//задает минимальную высоту слайдеру (% от ширины)
				minHeigh: false,
				//задает высоту слайдеру (% от ширины)
				height: false,
				//загрузка кадров через ajax
				ajax: false,
				ajaxBuffer: 2,
				responsiveBreakpoints : {
					portrait: { 
						changePoint:480,
						visibleItems: 1
					}, 
					landscape: { 
						changePoint:640,
						visibleItems: 2
					},
					tablet: { 
						changePoint:768,
						visibleItems: 3
					}
				}
			}, options);
		
		var settings = $.extend(defaults, options);
		var object = $(this);	
		var totalItems = object.children().length;
		var responsivePoints = [];	
	} else {
		var settings = s.settings;
		var object = $(this);			
		var totalItems = s.totalItems;
		var responsivePoints = s.responsivePoints;
	}
/***
Ф-ия сохраняет текущие настройки
***/	
function update(){
	object.data('aitsl',{
	'settings' : settings,
	'totalItems' : totalItems,
	'responsivePoints' : responsivePoints});	
}
		
//внутренние переменные
var canNavigate = true;
var autoPlayDirectionParam="right";
var timer;
var itemsWidth;
		
		
var methods = {
	init : function() {	
		return this.each(function() {
			methods.appendHTML();
			methods.setEventHandlers();
			methods.initializeItems();
		});	
	},		    
/***
Показ слайдера
***/
	initializeItems : function() {				
		var listParent = object.parent();
		var innerHeight = listParent.height();
		var childSet = object.children();
		methods.sortResponsiveObject(settings.responsiveBreakpoints);
		
		var innerWidth = listParent.width(); 
		itemsWidth = (innerWidth) / settings.visibleItems;
		childSet.width(itemsWidth);    
		object.css("display", "block");
		
		//установка высоты (если необходимо)  
		if(settings.minHeight){
			childSet.css("min-height", parseFloat(innerWidth*settings.minHeight)+"px" );
		}else if(settings.height){
			childSet.height( parseFloat(innerWidth*settings.height) );
		}

		//если autoResize
		if(settings.autoResize){			
			setTimeout(function() {
				methods.Resize();
			}, 200);
		}

		//если эффект смены = opacity
		if(settings.effectOfPaging=="opacity"){
			object.height(childSet.height());
			allItem=object.find("li.sliderItem");
			Item=object.find("li.sliderItem:nth-child(1)");
			
			allItem.css("opacity","0");
			allItem.css("z-index","-1");
							
			Item.css("z-index","0");
			Item.css("opacity","1");
		}
		
		update();
		
	},
            
/***
Создает структуру
***/
	appendHTML : function() {	
		console.clear;			
		object.addClass("nbs-aitsl-ul");
		object.wrap("<div class='nbs-aitsl-container'><div class='nbs-aitsl-inner'></div></div>");
		object.find("li.sliderItem").addClass("nbs-aitsl-item");
		
		//если эффект смены = opacity
		if(settings.effectOfPaging=="opacity"){
			object.addClass("nbs-aitsl-ul-opacity");
		}

		//если создавать кнопки навигации
		$('<a href="http://ait-web.ru" style="display:none;">Создание и продвижение сайтов</a>').insertAfter(object);					
		if(settings.createNavButtons=="inside"){
			var bottonsSt='';
			for (var i = 1; i<=totalItems; i++) {
				if(i==1){
					//первая
					bottonsSt+='<a class="NavButton active" href="#" data-item="'+i+'"></a>';
				}else{
					//остальные
					bottonsSt+='<a class="NavButton" href="#" data-item="'+i+'"></a>';
				}
			}
			$('<div class="aitslNavButton">'+bottonsSt+'</div>').insertAfter(object);
		}else if(settings.createNavButtons=="outside"){
			var bottonsSt='';
			for (var i = 1; i<=totalItems; i++) {
				if(i==1){
					bottonsSt+='<a class="NavButton active" href="#" data-item="'+i+'"></a>';
				}else{
					bottonsSt+='<a class="NavButton" href="#" data-item="'+i+'"></a>';
				}
			}
			$('<div class="aitslNavButton">'+bottonsSt+'</div>').insertAfter(object.parent().parent());
		}
		
		//Создание кнопок листания
		if(settings.createListButtons=="inside"){				
			$(settings.LeftListButtonsContent+settings.RightListButtonsContent).insertAfter(object);
		}else if(settings.createListButtons=="outside"){				
			$(settings.LeftListButtonsContent+settings.RightListButtonsContent).insertAfter(object.parent().parent());
		}

		//загрузка элементов через ajax
		if(settings.ajax==true){
			//загрузка начальных элементов
			methods.ajaxLoadElements(1, (settings.visibleItems+settings.ajaxBuffer) );
		}

		update();
	},
		
/***
Функция загружает кадры слайдера через ajax
***/
ajaxLoadElements : function(endPosition,count){
	var min=endPosition;
	if (min<1) {
		min=1;
	};	

	var max=endPosition+count;
	if (max>settings.totalItems) {
		max=settings.totalItems;
	};


	var listParent = object.parent();
	var innerHeight = $(listParent).height();
	var itemsWidth = $(listParent).width() / settings.visibleItems;
	//console.log("itemsWidth="+itemsWidth+" innerHeight="+innerHeight);
	//console.log("min="+min+" fai="+settings.firstActiveItem+" max="+max);

	for (var i = min; i < (max); i++) {
		var item = object.find("li[data-item="+i+"]");
		if( item.children().length== 0 ){

			item.load(item.data("cont"), function(response, status, xhr) {
			  if (status == "error") {
			  	console.log('При загрузке данных произошла ошибка: '+xhr.status+" "+xhr.statusText);
			    $(this).html('<div class="table"><div class="tableCell">При загрузке данных произошла ошибка: ' + xhr.status + " " + xhr.statusText+'</div></div>');
			  }else{
			  	console.log("Ajax load cont="+item.data("cont")+" ok.");
			  }
			});
		}
	
	};

},

/***
Листание слайдера на нужную позицию
***/
	scrolltoPosition : function(endPosition,duration){
		if(canNavigate==true){			
			//если autoPlay(copy)
			if (settings.autoPlay){
				if(endPosition!=settings.firstActiveItem){
					if(endPosition>settings.firstActiveItem){
						canNavigate = false;
						clearInterval(timer);
						//листание вправо
						methods.scrollCopyAutoRightPrivate(endPosition,duration);
					}else{
						canNavigate = false;
						clearInterval(timer);
						//листание влево
						methods.scrollCopyAutoLeftPrivate(endPosition,duration);
					}		
				}
			}else{
				if( (endPosition>0)&&(endPosition<=totalItems)  ){
					canNavigate = false;
					clearInterval(timer);

					//загрузка элементов через ajax
					if(settings.ajax==true){
						methods.ajaxLoadElements( (endPosition-settings.ajaxBuffer), (settings.visibleItems+settings.ajaxBuffer*2) );
					}

					methods.scrolltoPositionPrivate(endPosition,duration,function() {
						methods.updateNavButtons(endPosition);
						canNavigate = true;
						methods.updateListButtons();
					});	
				}
			}
			
		}		
	},
	
/***
обновление статуса кнопок навигации
***/
	updateNavButtons : function(endPosition, resize) {
		if(settings.createNavButtons=="inside"){
			var listParent = object.parent();
			var NavButtons = listParent.find(".aitslNavButton a");
			listParent.find(".aitslNavButton a").removeClass("active");
			listParent.find(".aitslNavButton a[data-item='"+endPosition+"']").addClass("active");
			//если необходим resize
			if(resize){
				listParent.find(".aitslNavButton").width( totalItems* listParent.find(".aitslNavButton a").outerWidth(true) );
			}
			
		}else if(settings.createNavButtons=="outside"){
			var listParentP = object.parent().parent().parent();
			var NavButtons = listParentP.find(".aitslNavButton a");
			listParentP.find(".aitslNavButton a").removeClass("active");
			listParentP.find(".aitslNavButton a[data-item='"+endPosition+"']").addClass("active");
			//если необходим resize
			if(resize){
				listParentP.find(".aitslNavButton").width( totalItems* listParentP.find(".aitslNavButton a").outerWidth(true) );
			}
		}
	},
	
/***
обновление статуса кнопок листания
***/
	updateListButtons : function() {
		var listParent = object.parent();
		var innerHeight = $(listParent).height();
		
		if(settings.createListButtons=="inside"){						
			var leftArrow = listParent.find(".nbs-aitsl-nav-left");
			var rightArrow = listParent.find(".nbs-aitsl-nav-right");			
			var halfArrowHeight = (leftArrow.height()) / 2;
			var arrowMargin = (innerHeight / 2) - halfArrowHeight;
			leftArrow.css("top", arrowMargin + "px");
			rightArrow.css("top", arrowMargin + "px");
			//скрытие крайних кнопок
			if( (settings.autoHideListButton==true)&&(!settings.autoPlay) ){
				//левая
				if( settings.firstActiveItem==1){
					leftArrow.css("display","none");
				}else{
					leftArrow.css("display","block");
				}
				//правая
				if( settings.firstActiveItem+settings.visibleItems-1==totalItems){
					rightArrow.css("display","none");
				}else{
					rightArrow.css("display","block");
				}
			}							
			
		}else if(settings.createListButtons=="outside"){
			var listParentP = object.parent().parent().parent();
			var leftArrow = listParentP.find(".nbs-aitsl-nav-left");
			var rightArrow = listParentP.find(".nbs-aitsl-nav-right");			
			var halfArrowHeight = (leftArrow.height()) / 2;
			var arrowMargin = (innerHeight / 2) - halfArrowHeight;
			leftArrow.css("top", arrowMargin + "px");
			rightArrow.css("top", arrowMargin + "px");	
			
			//скрытие крайних кнопок
			if( (settings.autoHideListButton==true)&&(!settings.autoPlay) ){
				//левая
				if( settings.firstActiveItem==1){
					leftArrow.css("display","none");
				}else{
					leftArrow.css("display","block");
				}
				//правая
				if( settings.firstActiveItem+settings.visibleItems-1==totalItems){
					rightArrow.css("display","none");
				}else{
					rightArrow.css("display","block");
				}
			}				
			
		}

		
	},
/***
Обработка событий
***/
	setEventHandlers : function() {
		
		//определение ListButtons
		if(settings.createListButtons=="inside"){
			var listParent = object.parent();
			var ListButtonsLeft = listParent.find(".nbs-aitsl-nav-left");
			var ListButtonsRight = listParent.find(".nbs-aitsl-nav-right");
		}else if(settings.createListButtons=="outside"){
			var listParentP = object.parent().parent().parent();
			var ListButtonsLeft = listParentP.find(".nbs-aitsl-nav-left");
			var ListButtonsRight = listParentP.find(".nbs-aitsl-nav-right");
		}

		//определение NavButtons
		if(settings.createNavButtons=="inside"){
			var listParent = object.parent();
			var NavButtons = listParent.find(".aitslNavButton a");
		}else if(settings.createNavButtons=="outside"){
			var listParentP = object.parent().parent().parent();
			var NavButtons = listParentP.find(".aitslNavButton a");
		}		
		
		//обработка события нажатия на кнопки листания
		if( ((settings.createListButtons=="inside") || (settings.createListButtons=="outside")) ){
			$(ListButtonsLeft).click(function () {
				if (settings.processingButtonsList){
					methods.scrolltoPosition(settings.firstActiveItem-1,settings.animationSpeed);
				}
				return false;
			});
			
			$(ListButtonsRight).click(function () {
				if (settings.processingButtonsList && ( (totalItems>(settings.firstActiveItem+settings.visibleItems-1)) || (settings.autoPlay) )  ){
					methods.scrolltoPosition(settings.firstActiveItem+1,settings.animationSpeed);
				}
				return false;
			});
		}
		//обработка события нажатия на кнопки навигатора		
			$(NavButtons).click(function () {
				if (settings.processingButtonsNav){
					var endPosition= parseFloat($(this).attr("data-item"));					
					methods.scrolltoPosition(endPosition,settings.animationSpeed);
				}
				return false;
			});

		if (settings.autoPlay == true) {
			methods.autoStartSlider(true);
		}
		
		$(window).resize(function(){
			if(settings.autoResize){
				methods.Resize();
			}
		});
 		update();
	},
/***
Запускает слайдер через settings.autoPlaySpeed
***/                    
	autoStartSlider: function()  {
		timer=setInterval(function() {
			if (canNavigate == true){
				canNavigate = false;
				clearInterval(timer);
				//обработка события hover
				if((settings.pauseOnHover) && ($('#'+object.attr("id")+":hover").length > 0)  ){
					canNavigate = true;
					methods.autoStartSlider();
					update();
				}else{				
				if(settings.autoPlayDirection=="auto"){
					//определение временного направления листания
					if(settings.firstActiveItem==1){	autoPlayDirectionParam="right";	}
					else if(settings.firstActiveItem==totalItems){autoPlayDirectionParam="left";}
					
					//временного направления листания left
					if(autoPlayDirectionParam=="left"){
						methods.scrollCopyAutoLeftPrivate(settings.firstActiveItem-settings.autoPlayCount,settings.animationSpeed);
					}else{
						//временного направления листания Right
						methods.scrollCopyAutoRightPrivate(settings.firstActiveItem+settings.autoPlayCount,settings.animationSpeed);	
					}
					
				}else if(settings.autoPlayDirection=="left"){
					//направление листания Left
					methods.scrollCopyAutoLeftPrivate(settings.firstActiveItem-settings.autoPlayCount,settings.animationSpeed);
				}else if(settings.autoPlayDirection=="right"){
					//направление листания Right
					methods.scrollCopyAutoRightPrivate(settings.firstActiveItem+settings.autoPlayCount,settings.animationSpeed);
				}
				}
			}
		}, settings.autoPlaySpeed);
	},	

/***
кол-во visibleItems при разных разрешениях
***/                    
	setResponsiveEvents: function() {
		var contentWidth = $('html').width();
		
		if(settings.enableResponsiveBreakpoints) {
			
			var largestCustom = responsivePoints[responsivePoints.length-1].changePoint; 
			
			for(var i in responsivePoints) {
				
				if(contentWidth >= largestCustom) { 
					settings.visibleItems = settings.visibleItems;
					break;
				}
				else { 
				
					if(contentWidth < responsivePoints[i].changePoint) {
						settings.visibleItems = responsivePoints[i].visibleItems;
						break;
					}
					else
						continue;
				}
			}
		}
		update();
	},

/***
sortResponsiveObject
***/  
	sortResponsiveObject: function(obj) {
		
		var responsiveObjects = [];
		
		for(var i in obj) {
			responsiveObjects.push(obj[i]);
		}
		
		responsiveObjects.sort(function(a, b) {
			return a.changePoint - b.changePoint;
		});
	
		responsivePoints = responsiveObjects;
		update();
	},

/***
Осуществляет автоматическое листание на нужную позицию
***/ 		
    scrollCopyAutoRightPrivate : function(endPosition,duration){
		//на сколько позиций необходим здвиг
		var offsetR = endPosition-settings.firstActiveItem;
		
		if(offsetR<0){
			offsetR=totalItems+offsetR;
		}
			for (var i = 1; i <=offsetR; i++) {
				var childSet = object.children();
				var elem=object.find("li.nbs-aitsl-item:nth-child("+i+")").clone();						
				$(elem).insertAfter(childSet.last());
			}

			//загрузка элементов через ajax
			if(settings.ajax==true){
				methods.ajaxLoadElements( (endPosition-settings.ajaxBuffer), (settings.visibleItems+settings.ajaxBuffer*2) );
			}

			var firstActiveItemNow=parseFloat(settings.firstActiveItem);
			methods.scrolltoPositionPrivate(offsetR+1, duration,function() {
				settings.firstActiveItem=firstActiveItemNow+offsetR;
				childSet.slice(0, offsetR).remove();
				object.css("left","0px");			
				if(settings.firstActiveItem>totalItems){
					settings.firstActiveItem=settings.firstActiveItem-totalItems;
				}
				
				//обновить кнопки NavButtons (если они созданы)
				methods.updateNavButtons(settings.firstActiveItem, false);
				
				canNavigate = true;
				methods.autoStartSlider();
				update();					
			}); 

	},	

/***
Осуществляет автоматическое листание на нужную позицию
***/ 		
    scrollCopyAutoLeftPrivate : function(endPosition,duration){	
		if(endPosition==0){
			var offsetL=settings.firstActiveItem;
			endPosition=totalItems;
		}else if(endPosition<0){
			//на сколько позиций необходим здвиг
			var offsetL = settings.firstActiveItem-endPosition;
			endPosition=totalItems+endPosition;
		}else{		
			//на сколько позиций необходим здвиг
			var offsetL = settings.firstActiveItem-endPosition;
		}		

			var k=0;
			for (var i = totalItems; i >(totalItems-offsetL); i--) {
				var childSet = object.children();
				var elem=object.find("li.nbs-aitsl-item:nth-child("+(i+k)+")").clone();						
				$(elem).insertBefore(childSet.first());
				k+=1;
			}

			//загрузка элементов через ajax
			if(settings.ajax==true){
				methods.ajaxLoadElements( (endPosition-settings.ajaxBuffer), (settings.visibleItems+settings.ajaxBuffer*2) );
			}

			var firstActiveItemNow=parseFloat(settings.firstActiveItem);
			
			//не видимый здвинуть на текущую позицию слайдера
			methods.scrolltoPositionPrivate(offsetL+1, 1,function(){
			
				//видимый здвиг (листание)
				methods.scrolltoPositionPrivate(1, duration,function() {
					childSet.slice(totalItems-1, totalItems+offsetL).remove();
					
					//обновить кнопки NavButtons (если они созданы)
					methods.updateNavButtons(endPosition, false);
					
					settings.firstActiveItem=endPosition;
					canNavigate = true;
					methods.autoStartSlider();
					update();
				});
				
			
			});
	},	

	
/***
Внутренняя ф-ия листания на нужный элемент (непосредственно выполняет листание)
***/ 		
	scrolltoPositionPrivate : function( endPosition, duration, callback ){

		if (!duration){
			duration=settings.animationSpeed;
		}
		
		var childSet = object.children();
		var listParent = object.parent();
		var innerWidth = listParent.width();

			itemsWidth = (innerWidth) / settings.visibleItems;
			nowPosition=-itemsWidth*(settings.firstActiveItem-1);
			newPosition=-itemsWidth*(endPosition-1);
		
			//смена без анимации
			if(duration==1){

				if(settings.effectOfPaging!="opacity"){
					object.css("left",newPosition);
				}else{
					
				}
				settings.firstActiveItem=endPosition;
				update();
				if(callback){
					callback();
				}				
			}else{
				//если эффект исчезновения
				if(settings.effectOfPaging=="opacity"){

					//если слайдер auto(copy)
					//var oldItem=object.find("li:nth-child("+settings.firstActiveItem+")");
					var newItem=object.find("li.sliderItem:nth-child("+endPosition+")");

					var allItem=object.find("li");
					//console.log("oldItem="+(settings.firstActiveItem)+" newItem="+(endPosition) );
					//console.log("fai="+settings.firstActiveItem+" endPosition="+endPosition+"| old="+oldItem.data("item")+"new="+newItem.data("item") );
					
					//allItem.css("opacity","0");
					newItem.css("opacity","0");
					newItem.css("z-index","1");
					//oldItem.css("z-index","1");

							
					newItem.animate({
						"opacity" : 1
					}, {
						queue : true,
						duration : settings.animationSpeed,
						easing : "linear",
						complete : function() {
							
							allItem.css("opacity","0");
							allItem.css("z-index","-1");
							
							newItem.css("z-index","0");
							newItem.css("opacity","1");
							
							//oldItem.css("opacity","1");
							

							settings.firstActiveItem=endPosition;
							update();
							if(callback){
								callback();
							}
							//Вызов callback ф-ии: (после листания)
							if(settings.callBackOnScroll){
								settings.callBackOnScroll();
							}	
						}
					});	
								
				}else{
					//если стандартное листание
					object.animate({
						"left" : newPosition
					}, {
						queue : true,
						duration : duration,
						easing : "linear",
						complete : function() {
							settings.firstActiveItem=endPosition;								
							update();
							if(callback){
								callback();
							}
							//Вызов callback ф-ии: (после листания)
							if(settings.callBackOnScroll){
								settings.callBackOnScroll();
							}	
						}
					});
				}	
			}	
	},
/***
Номер первой активной позиции
***/
		getFirstActiveItem : function( ) {
			return settings.firstActiveItem;
		},
/***
первая и последняя активная позиция
***/
		getActiveItems : function( ) {
			var arr = [settings.firstActiveItem,(settings.firstActiveItem+settings.visibleItems-1)];
			return arr;		
		},
/***
кол-во активных элементов
***/
		getVisibleItems : function( ) {
			return settings.visibleItems;	
		},
/***
Resize
***/
	Resize : function() {
		var listParent = object.parent();
		var childSet = object.children();	
		
		console.log("resize");
		//очистка загруженных картинок
		//object.find("li.sliderItem").empty();

		//обновление для разрешений экранов
		methods.setResponsiveEvents();

		var innerWidth = $(listParent).width();
		
		//установка высоты (если необходимо)
		if(settings.minHeight){
			childSet.css("min-height", parseFloat(innerWidth*settings.minHeight)+"px" );
			object.css("min-height", parseFloat(innerWidth*settings.minHeight)+"px" );
		}else if(settings.height){
			childSet.height( parseFloat(innerWidth*settings.height) );
			object.height( parseFloat(innerWidth*settings.height) );
		}
		
		var innerHeight = $(listParent).height();
		itemsWidth = (innerWidth) / settings.visibleItems;			
		childSet.width(itemsWidth);
		object.css("left", 0);
		
		//обновление кнопок навигации
		methods.updateNavButtons(settings.firstActiveItem, true);
		
		//обновление кнопок листания			
		methods.updateListButtons();

		//листание на текущую позицию
		methods.scrolltoPosition(settings.firstActiveItem,1);
	}
			
};
		
        if (methods[options]) {
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1), function(){
			});
        } else if (typeof options === 'object' || !options) { 
            return methods.init.apply(this);
        } else {
            $.error('Метод "' + method + '" не существует!');
        }
    };
})(jQuery);