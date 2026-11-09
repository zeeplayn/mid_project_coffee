$(document).ready(function () {


  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


  function showMsg(input, text, ok) {
    var $input = $(input);
    var $msg = $input.nextAll('.form-msg').first();

    $input.removeClass('is-valid is-invalid');
    $msg.removeClass('msg-ok msg-error');

    if (ok) {
      $input.addClass('is-valid');
      $msg.addClass('msg-ok').text('✔ ' + text);
    } else {
      $input.addClass('is-invalid');
      $msg.addClass('msg-error').text('✖ ' + text);
    }
  }

  function checkName() {
    var value = $('#reg-name').val().trim();
    if (value === '') {
      showMsg('#reg-name', 'Name is required', false);
      return false;
    }
    if (value.length < 2) {
      showMsg('#reg-name', 'Name is too short', false);
      return false;
    }
    showMsg('#reg-name', 'Looks good', true);
    return true;
  }

  function checkEmail() {
    var value = $('#reg-email').val().trim();
    if (value === '') {
      showMsg('#reg-email', 'Email is required', false);
      return false;
    }
    if (!emailRegex.test(value)) {
      showMsg('#reg-email', 'Email format is wrong (example: name@mail.com)', false);
      return false;
    }
    showMsg('#reg-email', 'Email is correct', true);
    return true;
  }

  function checkPassword() {
    var value = $('#reg-password').val();
    if (value === '') {
      showMsg('#reg-password', 'Password is required', false);
      return false;
    }
    if (value.length < 6) {
      showMsg('#reg-password', 'Password must have at least 6 characters', false);
      return false;
    }
    showMsg('#reg-password', 'Password is ok', true);
    return true;
  }

 
 function updateStrength() {
    var value = $('#reg-password').val();
    var score = 0;

    if (value.length >= 8) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^a-zA-Z0-9]/.test(value)) score++;

    var $bar = $('#strength-bar');
    $bar.removeClass('bg-danger bg-warning bg-success');

    if (value === '') {
      $bar.css('width', '0%');
      $('#strength-text').text('');
    } else if (score <= 1) {
      $bar.addClass('bg-danger').css('width', '33%');
      $('#strength-text').text('Strength: Weak').css('color', 'red');
    } else if (score <= 3) {
      $bar.addClass('bg-warning').css('width', '66%');
      $('#strength-text').text('Strength: Medium').css('color', 'orange');
    } else {
      $bar.addClass('bg-success').css('width', '100%');
      $('#strength-text').text('Strength: Strong').css('color', 'green');
    }
  }

  function checkConfirm() {
    var pass = $('#reg-password').val();
    var confirm = $('#reg-confirm').val();
    if (confirm === '') {
      showMsg('#reg-confirm', 'Please confirm your password', false);
      return false;
    }
    if (pass !== confirm) {
      showMsg('#reg-confirm', 'Passwords do not match', false);
      return false;
    }
    showMsg('#reg-confirm', 'Passwords match', true);
    return true;
  }


  $('#reg-name').on('input blur', checkName);
  $('#reg-email').on('input blur', checkEmail);
  $('#reg-password').on('input', function () {
    checkPassword();
    updateStrength();
    if ($('#reg-confirm').val() !== '') {
      checkConfirm();
    }
  });
  $('#reg-confirm').on('input blur', checkConfirm);


  $('#register-form').on('submit', function (e) {
    e.preventDefault(); 

    var nameOk = checkName();
    var emailOk = checkEmail();
    var passOk = checkPassword();
    var confirmOk = checkConfirm();

    if (nameOk && emailOk && passOk && confirmOk) {
      var name = $('#reg-name').val().trim();
      $('#form-alert').html('<div class="alert alert-success">Welcome, ' +
        $('<span>').text(name).html() + '! You are registered.</div>');

      this.reset();
      $('#register-form .form-control, #register-form input').removeClass('is-valid is-invalid');
      $('.form-msg').text('');
      updateStrength();
    } else {
      $('#form-alert').html('<div class="alert alert-danger">Please fix the errors below and try again.</div>');
    }
  });

  var currentCategory = 'all';

  function filterMenu() {
    var text = $('#search-input').val().toLowerCase().trim();
    var found = 0;

    $('.menu-grid .card-item').each(function () {
      var $card = $(this);
      var name = $card.find('h3').text().toLowerCase();
      var desc = $card.find('.desc').text().toLowerCase();
      var category = $card.data('category');

      var textMatch = name.indexOf(text) !== -1  desc.indexOf(text) !== -1;
      var categoryMatch = (currentCategory === 'all'  category === currentCategory);

      if (textMatch && categoryMatch) {
        $card.show();
        found++;
      } else {
        $card.hide();
      }
    });

    if (found === 0) {
      $('#no-results').show();
    } else {
      $('#no-results').hide();
    }
  }

  $('#search-input').on('input', filterMenu);

  $('.filter-btn').on('click', function () {
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');
    currentCategory = $(this).data('filter');
    filterMenu();
  });


  var $galleryImages = $('.gallery-item img');
  var currentImage = 0;

  function showImage(index) {
    if (index < 0) index = $galleryImages.length - 1;
    if (index >= $galleryImages.length) index = 0;
    currentImage = index;

    var $img = $galleryImages.eq(index);

    $('#lb-img').fadeOut(200, function () {
      $(this).attr('src', $img.attr('src')).attr('alt', $img.attr('alt'));
      $('#lb-caption').text($img.attr('alt') + ' (' + (index + 1) + '/' + $galleryImages.length + ')');
      $(this).fadeIn(300);
    });
  }

  function openLightbox(index) {
    currentImage = index;
    var $img = $galleryImages.eq(index);

    $('#lb-img').attr('src', $img.attr('src')).attr('alt', $img.attr('alt'));
    $('#lb-caption').text($img.attr('alt') + ' (' + (index + 1) + '/' + $galleryImages.length + ')');

    $('#lightbox').css('display', 'flex').hide().fadeIn(300);
    $('.lb-content').css('margin-top', '-40px').animate({ 'margin-top': '0px' }, 300);
  }

  function closeLightbox() {
    $('#lightbox').fadeOut(300);
  }

  $galleryImages.on('click', function () {
    openLightbox($galleryImages.index(this));
  });

  $('#lb-next').on('click', function () { showImage(currentImage + 1); });
  $('#lb-prev').on('click', function () { showImage(currentImage - 1); });
  $('#lb-close').on('click', closeLightbox);

  $('#lightbox').on('click', function (e) {
    if (e.target === this) {
      closeLightbox();
    }
  });

  $(document).on('keydown', function (e) {
    if (!$('#lightbox').is(':visible')) return;
    if (e.key === 'ArrowRight') showImage(currentImage + 1);
    if (e.key === 'ArrowLeft') showImage(currentImage - 1);
    if (e.key === 'Escape') closeLightbox();
  });