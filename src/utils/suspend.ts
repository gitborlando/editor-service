export class SuspendSwitch {
  private _resolve: () => void;

  fullFill() {
    console.log('fullFill');
    return new Promise<void>((resolve) => {
      this._resolve = resolve;
    });
  }

  endSuspend() {
    console.log('endSuspend');
    this._resolve();
  }
}
