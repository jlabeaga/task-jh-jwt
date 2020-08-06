import { element, by, ElementFinder } from 'protractor';

export class TaskComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-task div table .btn-danger'));
  title = element.all(by.css('jhi-task div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }
}

export class TaskUpdatePage {
  pageTitle = element(by.id('jhi-task-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));
  dateCreatedInput = element(by.id('field_dateCreated'));
  dueDateInput = element(by.id('field_dueDate'));
  statusSelect = element(by.id('field_status'));
  resultSelect = element(by.id('field_result'));
  estimatedHoursInput = element(by.id('field_estimatedHours'));

  ownerSelect = element(by.id('field_owner'));
  resourcesSelect = element(by.id('field_resources'));
  tasklistSelect = element(by.id('field_tasklist'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setDateCreatedInput(dateCreated: string): Promise<void> {
    await this.dateCreatedInput.sendKeys(dateCreated);
  }

  async getDateCreatedInput(): Promise<string> {
    return await this.dateCreatedInput.getAttribute('value');
  }

  async setDueDateInput(dueDate: string): Promise<void> {
    await this.dueDateInput.sendKeys(dueDate);
  }

  async getDueDateInput(): Promise<string> {
    return await this.dueDateInput.getAttribute('value');
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async setResultSelect(result: string): Promise<void> {
    await this.resultSelect.sendKeys(result);
  }

  async getResultSelect(): Promise<string> {
    return await this.resultSelect.element(by.css('option:checked')).getText();
  }

  async resultSelectLastOption(): Promise<void> {
    await this.resultSelect.all(by.tagName('option')).last().click();
  }

  async setEstimatedHoursInput(estimatedHours: string): Promise<void> {
    await this.estimatedHoursInput.sendKeys(estimatedHours);
  }

  async getEstimatedHoursInput(): Promise<string> {
    return await this.estimatedHoursInput.getAttribute('value');
  }

  async ownerSelectLastOption(): Promise<void> {
    await this.ownerSelect.all(by.tagName('option')).last().click();
  }

  async ownerSelectOption(option: string): Promise<void> {
    await this.ownerSelect.sendKeys(option);
  }

  getOwnerSelect(): ElementFinder {
    return this.ownerSelect;
  }

  async getOwnerSelectedOption(): Promise<string> {
    return await this.ownerSelect.element(by.css('option:checked')).getText();
  }

  async resourcesSelectLastOption(): Promise<void> {
    await this.resourcesSelect.all(by.tagName('option')).last().click();
  }

  async resourcesSelectOption(option: string): Promise<void> {
    await this.resourcesSelect.sendKeys(option);
  }

  getResourcesSelect(): ElementFinder {
    return this.resourcesSelect;
  }

  async getResourcesSelectedOption(): Promise<string> {
    return await this.resourcesSelect.element(by.css('option:checked')).getText();
  }

  async tasklistSelectLastOption(): Promise<void> {
    await this.tasklistSelect.all(by.tagName('option')).last().click();
  }

  async tasklistSelectOption(option: string): Promise<void> {
    await this.tasklistSelect.sendKeys(option);
  }

  getTasklistSelect(): ElementFinder {
    return this.tasklistSelect;
  }

  async getTasklistSelectedOption(): Promise<string> {
    return await this.tasklistSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class TaskDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-task-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-task'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
