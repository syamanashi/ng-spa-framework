import { Spa2Page } from './app.po';

describe('spa2 App', () => {
  let page: Spa2Page;

  beforeEach(() => {
    page = new Spa2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
