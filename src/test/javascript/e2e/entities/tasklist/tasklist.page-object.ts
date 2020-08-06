import { element, by, ElementFinder } from 'protractor';

export class TasklistComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-tasklist div table .btn-danger'));
  title = element.all(by.css('jhi-tasklist div h2#page-heading span')).first();
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

export class TasklistUpdatePage {
  pageTitle = element(by.id('jhi-tasklist-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  descriptionInput = element(by.id('field_description'));

  participantsSelect = element(by.id('field_participants'));

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

  async participantsSelectLastOption(): Promise<void> {
    await this.participantsSelect.all(by.tagName('option')).last().click();
  }

  async participantsSelectOption(option: string): Promise<void> {
    await this.participantsSelect.sendKeys(option);
  }

  getParticipantsSelect(): ElementFinder {
    return this.participantsSelect;
  }

  async getParticipantsSelectedOption(): Promise<string> {
    return await this.participantsSelect.element(by.css('option:checked')).getText();
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

export class TasklistDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-tasklist-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-tasklist'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getText();
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
