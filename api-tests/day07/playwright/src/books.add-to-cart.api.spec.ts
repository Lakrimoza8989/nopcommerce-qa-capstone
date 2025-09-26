// 2B) Если catalog не сработал — идём на реальный PDP и бьём details
if (!added) {
  // 1) сначала пробуем по ID (вдруг сработает на этом инстансе)
  let pdpUrl = catalogId ? `/productdetails/${catalogId}` : '';
  let pdpRes = pdpUrl
    ? await api.get(pdpUrl, { headers: { Referer: `${BASE_URL}/books` } })
    : null;

  // 2) если 404/нет ответа — достаём реальную ссылку из /books
  if (!pdpRes || !pdpRes.ok()) {
    const href = extractFirstProductHref(booksHtml);
    expect(href, 'Не нашёл ссылку на страницу товара на /books').toBeTruthy();
    pdpUrl = href!.startsWith('http') ? href! : `${href!.startsWith('/') ? '' : '/'}${href!}`;
    pdpRes = await api.get(pdpUrl, { headers: { Referer: `${BASE_URL}/books` } });
  }

  expect(pdpRes!.ok(), `GET ${pdpUrl} → ${pdpRes!.status()}`).toBeTruthy();

  const pdpHtml = await pdpRes!.text();

  // из реального PDP достаём и токен, и точный detailsId (он может отличаться от catalogId!)
  const token = extractToken(pdpHtml);
  const detailsId = extractDetailsProductId(pdpHtml);

  expect(token, 'Нет __RequestVerificationToken на PDP').not.toBeNull();
  expect(detailsId, 'Нет productId на PDP (name="addtocart_XX.EnteredQuantity")').not.toBeNull();

  const detailsUrl = `/addproducttocart/details/${detailsId}/1`;
  const form = new URLSearchParams();
  form.set('__RequestVerificationToken', token!);
  form.set(`addtocart_${detailsId}.EnteredQuantity`, '1');

  const addRes = await api.post(detailsUrl, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      Origin: BASE_URL,
      Referer: `${BASE_URL}${pdpUrl.startsWith('/') ? '' : '/'}${pdpUrl}`,
    },
    data: form.toString(),
  });

  expect(addRes.ok(), `POST ${detailsUrl} → ${addRes.status()}`).toBeTruthy();
  const json = await addRes.json().catch(() => ({}));
  expect(!!json?.success, `Ответ JSON: ${JSON.stringify(json)}`).toBeTruthy();
  added = true;
}
