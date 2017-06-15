import { PayslipPage } from './app.po';

describe('payslip App', () => {
  let page: PayslipPage;

  beforeEach(() => {
    page = new PayslipPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
