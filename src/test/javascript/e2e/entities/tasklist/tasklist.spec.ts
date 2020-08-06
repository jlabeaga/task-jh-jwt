import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TasklistComponentsPage, TasklistDeleteDialog, TasklistUpdatePage } from './tasklist.page-object';

const expect = chai.expect;

describe('Tasklist e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tasklistComponentsPage: TasklistComponentsPage;
  let tasklistUpdatePage: TasklistUpdatePage;
  let tasklistDeleteDialog: TasklistDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tasklists', async () => {
    await navBarPage.goToEntity('tasklist');
    tasklistComponentsPage = new TasklistComponentsPage();
    await browser.wait(ec.visibilityOf(tasklistComponentsPage.title), 5000);
    expect(await tasklistComponentsPage.getTitle()).to.eq('Tasklists');
    await browser.wait(ec.or(ec.visibilityOf(tasklistComponentsPage.entities), ec.visibilityOf(tasklistComponentsPage.noResult)), 1000);
  });

  it('should load create Tasklist page', async () => {
    await tasklistComponentsPage.clickOnCreateButton();
    tasklistUpdatePage = new TasklistUpdatePage();
    expect(await tasklistUpdatePage.getPageTitle()).to.eq('Create or edit a Tasklist');
    await tasklistUpdatePage.cancel();
  });

  it('should create and save Tasklists', async () => {
    const nbButtonsBeforeCreate = await tasklistComponentsPage.countDeleteButtons();

    await tasklistComponentsPage.clickOnCreateButton();

    await promise.all([
      tasklistUpdatePage.setNameInput('name'),
      tasklistUpdatePage.setDescriptionInput('description'),
      // tasklistUpdatePage.participantsSelectLastOption(),
    ]);

    expect(await tasklistUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await tasklistUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await tasklistUpdatePage.save();
    expect(await tasklistUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await tasklistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Tasklist', async () => {
    const nbButtonsBeforeDelete = await tasklistComponentsPage.countDeleteButtons();
    await tasklistComponentsPage.clickOnLastDeleteButton();

    tasklistDeleteDialog = new TasklistDeleteDialog();
    expect(await tasklistDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Tasklist?');
    await tasklistDeleteDialog.clickOnConfirmButton();

    expect(await tasklistComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
