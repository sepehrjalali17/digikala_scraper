// تابع استخراج اطلاعات محصولات
function scrapeProducts() {
  const products = [];
  const items = document.querySelectorAll('.product-list_ProductList__item__LiiNI');

  items.forEach(product => {
    const title = product.querySelector('.ellipsis-2')?.innerText.trim() || 'عنوان ندارد';
    const price = product.querySelector('div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)')?.innerText.trim() || 'قیمت ندارد';
    const image = product.querySelector('picture img')?.src || 'تصویر ندارد';

    products.push({
      عنوان: title,
      قیمت: price,
      تصویر: image
    });
  });

  return products;
}

// گوش دادن به پیام از popup.js برای اجرای scrapeProducts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeProducts") {
    const data = scrapeProducts();
    sendResponse({ products: data });
  }
});
