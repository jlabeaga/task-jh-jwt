import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TaskComponentsPage, TaskDeleteDialog, TaskUpdatePage } from './task.page-object';

const expect = chai.expect;

describe('Task e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let taskComponentsPage: TaskComponentsPage;
  let taskUpdatePage: TaskUpdatePage;
  let taskDeleteDialog: TaskDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Tasks', async () => {
    await navBarPage.goToEntity('task');
    taskComponentsPage = new TaskComponentsPage();
    await browser.wait(ec.visibilityOf(taskComponentsPage.title), 5000);
    expect(await taskComponentsPage.getTitle()).to.eq('Tasks');
    await browser.wait(ec.or(ec.visibilityOf(taskComponentsPage.entities), ec.visibilityOf(taskComponentsPage.noResult)), 1000);
  });

  it('should load create Task page', async () => {
    await taskComponentsPage.clickOnCreateButton();
    taskUpdatePage = new TaskUpdatePage();
    expect(await taskUpdatePage.getPageTitle()).to.eq('Create or edit a Task');
    await taskUpdatePage.cancel();
  });

  it('should create and save Tasks', async () => {
    const nbButtonsBeforeCreate = await taskComponentsPage.countDeleteButtons();

    await taskComponentsPage.clickOnCreateButton();

    await promise.all([
      taskUpdatePage.setNameInput('name'),
      taskUpdatePage.setDescriptionInput('description'),
      taskUpdatePage.setDateCreatedInput('2000-12-31'),
      taskUpdatePage.setDueDateInput('2000-12-31'),
      taskUpdatePage.statusSelectLastOption(),
      taskUpdatePage.resultSelectLastOption(),
      taskUpdatePage.setEstimatedHoursInput('5'),
      taskUpdatePage.ownerSelectLastOption(),
      // taskUpdatePage.resourcesSelectLastOption(),
      taskUpdatePage.tasklistSelectLastOption(),
    ]);

    expect(await taskUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await taskUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await taskUpdatePage.getDateCreatedInput()).to.eq('2000-12-31', 'Expected dateCreated value to be equals to 2000-12-31');
    expect(await taskUpdatePage.getDueDateInput()).to.eq('2000-12-31', 'Expected dueDate value to be equals to 2000-12-31');
    expect(await taskUpdatePage.getEstimatedHoursInput()).to.eq('5', 'Expected estimatedHours value to be equals to 5');

    await taskUpdatePage.save();
    expect(await taskUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Task', async () => {
    const nbButtonsBeforeDelete = await taskComponentsPage.countDeleteButtons();
    await taskComponentsPage.clickOnLastDeleteButton();

    taskDeleteDialog = new TaskDeleteDialog();
    expect(await taskDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Task?');
    await taskDeleteDialog.clickOnConfirmButton();

    expect(await taskComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
