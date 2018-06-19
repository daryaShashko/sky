/*
  const
    FORM_AREA_NUM_BUTTON_INCREMENT_CLASS = '.form-area__num-button_increment',
    FORM_AREA_NUM_BUTTON_DECREMENT_CLASS = '.form-area__num-button_decrement',
    FORM_AREA_INPUT_NUM_CLASS = '.form-area__input_num',
    FORM_AREA_NUM_CLASS = '.form-area__num',
    FROM_AREA_MESSAGE_ERROR_CLASS = '.form-area__message_error',
    FORM_AREA_INPUT_HIGHLIGHTED = 'form-area__input_highlighted';


  function addInputError(messageNode, message) {
    if (messageNode === null && !(numInput.classList.contains(FORM_AREA_INPUT_HIGHLIGHTED))) {
      numInputContainer.insertAdjacentHTML('afterend', message);
      cartItem.usage.classList.add(FORM_AREA_INPUT_HIGHLIGHTED);
    }
  }

  function removeInputError(messageNode) {
    if (messageNode !== null && numInput.classList.contains(FORM_AREA_INPUT_HIGHLIGHTED)) {
      numInput.classList.remove(FORM_AREA_INPUT_HIGHLIGHTED);
      messageNode.remove();
    }
  }

  function validationNumInput(inputValue, max, min, messageNode, message) {
    if (inputValue > max || inputValue < min) {
      addInputError(messageNode, message);
    } else{
      removeInputError(messageNode);
    }
  }


  var servicePlan = this.getServicePlan(cartItem);
  var ratePlan = getValidRatePlan(servicePlan);
  var currentUsage = parseInt(cartItem.usage);
  const messageText = 'available only in multiples of 1';
  const message = '<div class="form-area__message form-area__message_error">' + messageText + '</div>';
  const numInputContainer = document.querySelector(".form-area__num");

  if (ratePlan.blockRates.length > 0) {
    cartItem.usage = currentUsage + ratePlan.blockRates[0].blockSize;
  } else {
    cartItem.usage = currentUsage + 1;
  }
  numInputContainer.insertAdjacentHTML('afterend', message);
  console.log(cartItem);
*/


$(document).ready(function(){
    $('.form-area__input_select').selectpicker();


    const pricingModalTriggers = document.querySelectorAll('.pricing-component__modal-trigger');
    const pricingModalCancelButtons = document.querySelectorAll('.pricing-component__modal-btn_cancel');
    const pricingModalChangeButtons = document.querySelectorAll('.pricing-component__modal-btn_change');
    const pricingModalCloseButtons = document.querySelectorAll('.pricing-component__modal .btn_close');

    var modalWindow;

    function togglePricingModalVisibility(element) {
        if( element.hasClass('pricing-component__modal_visible')){
            $(element).removeClass('pricing-component__modal_visible');
            $('body').removeClass('no-scroll');
        }else{
            $(element).addClass('pricing-component__modal_visible');
            $('body').addClass('no-scroll');
        }
    }

    pricingModalTriggers.forEach(function (modalTriggerBtn) {
        modalTriggerBtn.addEventListener('click', function (e) {
            modalWindow = $(e.target).siblings('.pricing-component__modal');
            togglePricingModalVisibility(modalWindow);
        });
    });

    pricingModalCancelButtons.forEach(function (cancelBtn) {
        cancelBtn.addEventListener('click', function (e) {
            modalWindow = $(e.target).closest('.pricing-component__modal');
            togglePricingModalVisibility(modalWindow);
        });
    });

    pricingModalChangeButtons.forEach(function (changeBtn) {
        changeBtn.addEventListener('click', function (e) {
            modalWindow = $(e.target).closest('.pricing-component__modal');
            togglePricingModalVisibility(modalWindow);
        });
    });

    pricingModalCloseButtons.forEach(function (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            modalWindow = $(e.target).closest('.pricing-component__modal');
            togglePricingModalVisibility(modalWindow);
        });
    });


    const servicePlansContainers = document.querySelectorAll('.form-area__group_service-plans');

    servicePlansContainers.forEach(function (servicePlansContainer) {
        var servicePlansItems = $(servicePlansContainer).find('.form-area__item_radio_service-plans');
        var servicePlansItemsContainer = $(servicePlansContainer).find('.form-area__group-container_service-plans');
        if(servicePlansItems.length > 5){
            $(servicePlansItemsContainer).addClass('form-area__group_service-plans_with-scroll');
            $(servicePlansContainer).addClass('form-area__group_with-border');
            $(servicePlansContainer).addClass('form-area__group_with-border_bottom');

        }
    });

    $('.form-area__group_service-plans_with-scroll').on('scroll', function () {
        var containerScrollHeight = this.scrollHeight;
        var containerVisiblePart = this.clientHeight;
        var containerDynamicScrollValue = this.scrollTop;
        var servicePlansContainer = $(this).closest('.form-area__group_service-plans');
        if(containerDynamicScrollValue > 0 && (containerVisiblePart + containerDynamicScrollValue) !== containerScrollHeight ){ //когда скролл не ноль и не в конце
            (!$(servicePlansContainer).hasClass('form-area__group_with-border_top'))? $(servicePlansContainer).addClass('form-area__group_with-border_top') : '';
            (!$(servicePlansContainer).hasClass('form-area__group_with-border_bottom'))? $(servicePlansContainer).addClass('form-area__group_with-border_bottom') : '';
        }else if((containerVisiblePart + containerDynamicScrollValue) === containerScrollHeight ){ // когда скролл в конце
            (!$(servicePlansContainer).hasClass('form-area__group_with-border_top'))? $(servicePlansContainer).addClass('form-area__group_with-border_top') : '';
            ($(servicePlansContainer).hasClass('form-area__group_with-border_bottom')) ? $(servicePlansContainer).removeClass('form-area__group_with-border_bottom') : '';
        }else if(containerDynamicScrollValue === 0){//когда скролл в начале
            (!$(servicePlansContainer).hasClass('form-area__group_with-border_bottom'))? $(servicePlansContainer).addClass('form-area__group_with-border_bottom') : '';
            ($(servicePlansContainer).hasClass('form-area__group_with-border_top'))? $(servicePlansContainer).removeClass('form-area__group_with-border_top') : '';
        }
    });

    const
      NAVIGATION_ASIDE_ID = '#navigationAside',
      NAVIGATION_ITEM_CLASS = '.navigation__item',
      ANCHOR_TAG = 'a',
      HEADER_CLASS = '.header',
      FOOTER_CLASS = '.footer',
      HEADER_SECTION_ID = '#headerSection',
      HOME_BUTTON_KEY_CODE = 36,
      HOME_BUTTON_KEY_CODE_SAFARI = 63273;

    const $leftNavigation = $(NAVIGATION_ASIDE_ID);
    const $header = $(HEADER_CLASS);
    const $footer = $(FOOTER_CLASS);
    const $headerSection = $(HEADER_SECTION_ID);

    var
      topOffset,
      bottomOffset,
      idValue,
      element,
      topOffsetForElement;

    $leftNavigation.on('click', function (e) {
        if (e.target.closest(NAVIGATION_ITEM_CLASS)) {
            e.preventDefault();
            idValue = $(e.target.closest(NAVIGATION_ITEM_CLASS + ' ' + ANCHOR_TAG)).attr('href').replace('#', '');
            element = document.getElementById(idValue);
            topOffsetForElement = element.offsetTop;

            $('html, body').animate({
                scrollTop: topOffsetForElement + $headerSection.height()
            }, 200);
        }
    });


    $(window).on('keyup', function (e) {
        // safari fires 63273 instead of 36
        (e.keyCode == HOME_BUTTON_KEY_CODE || e.keyCode == HOME_BUTTON_KEY_CODE_SAFARI) && $(window).trigger('scroll')
    });

    $(window).on('load resize', function (e) {
        topOffset = $header.height() - 70; // 70px is a margin
        bottomOffset = $footer.height() + 20 + 22; // 20px is truste 22 is a margin

        /*$leftNavigation.affix({
            offset: {
                top: topOffset,
                bottom: bottomOffset
            }
        });*/

        if ($leftNavigation.length == 0) {
            return;
        }

        $leftNavigation.data('bs.affix').options.offset.top = topOffset;

        if (e.type === 'resize') {
            $leftNavigation.data('bs.affix').options.offset.top = topOffset;
            $leftNavigation.data('bs.affix').options.offset.bottom = bottomOffset;
        }
    });


});
