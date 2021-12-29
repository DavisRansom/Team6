const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#product-name').value.trim();
    const price = document.querySelector('#product-price').value.trim();
    const description = document.querySelector('#product-desc').value.trim();
    const img_url = document.querySelector('#product-img').value.trim();
    const category_id = document.querySelector('#category-select').value;

    if (name && price && description&&img_url && category_id) {
      const response = await fetch(`/api/products`, {
        method: 'POST',
        body: JSON.stringify({ name, price, description,img_url,category_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/api/users/profile');
      } else {
        alert('Failed to create product');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/api/users/profile')
      } else {
        alert('Failed to delete product');
      }
    }
  };
  
  document
    .querySelector('.new-product-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.delete-btn')
    .addEventListener('click', delButtonHandler);
  