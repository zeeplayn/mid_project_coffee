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

      var textMatch = name.indexOf(text) !== -1 || desc.indexOf(text) !== -1;
      var categoryMatch = (currentCategory === 'all' || category === currentCategory);

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

  if ($('#product-table').length) {

    var products = [
      { id: 1, name: 'Espresso', category: 'Coffee', price: 600 },
      { id: 2, name: 'Latte', category: 'Coffee', price: 900 },
      { id: 3, name: 'Lemonade', category: 'Cold', price: 800 },
      { id: 4, name: 'Cheesecake', category: 'Dessert', price: 1500 },
      { id: 5, name: 'Croissant', category: 'Dessert', price: 800 }
    ];
    var nextId = 6;
    var productModal = new bootstrap.Modal(document.getElementById('product-modal'));

    function renderTable() {
      var $body = $('#product-body');
      $body.empty();

      if (products.length === 0) {
        $body.append('<tr><td colspan="5">No products yet. Click "Add product".</td></tr>');
        return;
      }

      $.each(products, function (i, p) {
        var $row = $('<tr>').attr('data-id', p.id);
        $row.append($('<td>').text(p.id));
        $row.append($('<td>').text(p.name));
        $row.append($('<td>').text(p.category));
        $row.append($('<td>').text(p.price));

        var $edit = $('<button>').addClass('btn btn-sm btn-brown edit-btn').text('Edit');
        var $del = $('<button>').addClass('btn btn-sm btn-danger delete-btn').text('Delete');
        $row.append($('<td>').append($edit, ' ', $del));

        $body.append($row);
      });
    }

    function showCrudAlert(text, type) {
      $('#crud-alert').html('<div class="alert alert-' + type + '">' + text + '</div>');
      setTimeout(function () {
        $('#crud-alert .alert').fadeOut(400);
      }, 3000);
    }

    $('#add-btn').on('click', function () {
      $('#modal-title').text('Add product');
      $('#product-form')[0].reset();
      $('#product-id').val('');
      $('#modal-error').text('');
      productModal.show();
    });

    $('#product-body').on('click', '.edit-btn', function () {
      var id = $(this).closest('tr').data('id');
      var product = products.find(function (p) { return p.id === id; });

      $('#modal-title').text('Edit product');
      $('#product-id').val(product.id);
      $('#product-name').val(product.name);
      $('#product-category').val(product.category);
      $('#product-price').val(product.price);
      $('#modal-error').text('');
      productModal.show();
    });

    $('#product-form').on('submit', function (e) {
      e.preventDefault();

      var id = $('#product-id').val();
      var name = $('#product-name').val().trim();
      var category = $('#product-category').val();
      var price = Number($('#product-price').val());

      if (name === '') {
        $('#modal-error').text('Please enter a name');
        return;
      }
      if (!price || price <= 0) {
        $('#modal-error').text('Price must be more than 0');
        return;
      }

      if (id === '') {
        products.push({ id: nextId, name: name, category: category, price: price });
        nextId++;
        showCrudAlert('Product added!', 'success');
      } else {
        var product = products.find(function (p) { return p.id === Number(id); });
        product.name = name;
        product.category = category;
        product.price = price;
        showCrudAlert('Product updated!', 'info');
      }

      productModal.hide();
      renderTable();
    });

    $('#product-body').on('click', '.delete-btn', function () {
      var id = $(this).closest('tr').data('id');
      var product = products.find(function (p) { return p.id === id; });

      if (confirm('Delete "' + product.name + '"?')) {
        products = products.filter(function (p) { return p.id !== id; });
        renderTable();
        showCrudAlert('Product deleted.', 'danger');
      }
    });

    renderTable();
  }

});