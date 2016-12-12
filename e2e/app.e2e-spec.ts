import { FixerPage } from './app.po';

describe('fixer App', function() {
  let page: FixerPage;

  beforeEach(() => {
    page = new FixerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
