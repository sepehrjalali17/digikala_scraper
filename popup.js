document.getElementById("extract").addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractProducts,
  });
});

function extractProducts() {
  const products = [];
  const items = document.querySelectorAll('.product-list_ProductList__item__LiiNI');

  items.forEach(product => {
    const title = product.querySelector('.ellipsis-2')?.innerText.trim() || 'عنوان ندارد';
    const price = product.querySelector('div:nth-child(2) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)')?.innerText.trim() || 'قیمت ندارد';
    const image = product.querySelector('picture img')?.src || 'تصویر ندارد';

    products.push({ عنوان: title, قیمت: price, تصویر: image });
  });

  const json = JSON.stringify(products, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.json';
  a.click();

  URL.revokeObjectURL(url);
}
