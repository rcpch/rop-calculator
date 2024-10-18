(function (JQuery) {
  JQuery(document).ready(function() {

    // Append field descriptions into any error messages.
    var x = jQuery('.form-item.error').each(function() {
      var descr = jQuery(this).find('.description');
      jQuery(this).find('.form-item--error-message').append(descr);

      // Make error messages perceivable.
     // jQuery(this).attr('tabindex', '-1');
      var newid = jQuery(this).find(':input').attr('name') + '-description';
      jQuery(this).find('.form-item--error-message').attr('id', newid);
      jQuery(this).attr('role', 'alert');
      jQuery(this).find(':input').attr('aria-labelledby', newid);
    });

    //focus on the first input with an error
    jQuery('.error:first :input').focus();
  })
})(jQuery);
