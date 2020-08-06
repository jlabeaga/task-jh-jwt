import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ActionComponentsPage, ActionDeleteDialog, ActionUpdatePage } from './action.page-object';

const expect = chai.expect;

describe('Action e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let actionComponentsPage: ActionComponentsPage;
  let actionUpdatePage: ActionUpdatePage;
  let actionDeleteDialog: ActionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Actions', async () => {
    await navBarPage.goToEntity('action');
    actionComponentsPage = new ActionComponentsPage();
    await browser.wait(ec.visibilityOf(actionComponentsPage.title), 5000);
    expect(await actionComponentsPage.getTitle()).to.eq('Actions');
    await browser.wait(ec.or(ec.visibilityOf(actionComponentsPage.entities), ec.visibilityOf(actionComponentsPage.noResult)), 1000);
  });

  it('should load create Action page', async () => {
    await actionComponentsPage.clickOnCreateButton();
    actionUpdatePage = new ActionUpdatePage();
    expect(await actionUpdatePage.getPageTitle()).to.eq('Create or edit a Action');
    await actionUpdatePage.cancel();
  });

  it('should create and save Actions', async () => {
    const nbButtonsBeforeCreate = await actionComponentsPage.countDeleteButtons();

    await actionComponentsPage.clickOnCreateButton();

    await promise.all([
      actionUpdatePage.setNameInput('name'),
      actionUpdatePage.setDescriptionInput('description'),
      actionUpdatePage.setDateCreatedInput('2000-12-31'),
      actionUpdatePage.setHoursInput('5'),
      actionUpdatePage.ownerSelectLastOption(),
      actionUpdatePage.taskSelectLastOption(),
    ]);

    expect(await actionUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await actionUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await actionUpdatePage.getDateCreatedInput()).to.eq('2000-12-31', 'Expected dateCreated value to be equals to 2000-12-31');
    expect(await actionUpdatePage.getHoursInput()).to.eq('5', 'Expected hours value to be equals to 5');

    await actionUpdatePage.save();
    expect(await actionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await actionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Action', async () => {
    const nbButtonsBeforeDelete = await actionComponentsPage.countDeleteButtons();
    await actionComponentsPage.clickOnLastDeleteButton();

    actionDeleteDialog = new ActionDeleteDialog();
    expect(await actionDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Action?');
    await actionDeleteDialog.clickOnConfirmButton();

    expect(await actionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
