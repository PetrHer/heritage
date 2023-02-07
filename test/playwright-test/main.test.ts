import { test, expect } from '@playwright/test';

test('person_id',async ({page})=>{
    await page.goto('/person_id');
    await expect(page).toHaveTitle('Herytage');
});

// test('login',async({page})=>{
//     await page.goto('/login')
//     await page.getByTestId('username').click();
//     await page.getByTestId('username').fill('test@test.cz');
//     await page.getByTestId('password').click();
//     await page.getByTestId('password').fill('1234');
//     await page.getByTestId('signin').click();

    
// })



test.afterEach(({ page }, testInfo) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Finished ${testInfo.title} => ${testInfo.status?.toUpperCase()}`);
  
    if (testInfo.status !== testInfo.expectedStatus)
      console.log(`Did not run as expected, ended up at ${page.url()}`);
});