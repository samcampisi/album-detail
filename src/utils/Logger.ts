import Reactotron from 'reactotron-react-native';

export default class Logger {
  static log(title: string, msg: any): void {
    this.display(title, msg, 'LOG');
  }

  private static display(title: string, message: any, type: string) {
    Reactotron.display({
      name: type,
      preview: title,
      value: message,
      important: true,
    });
  }
}
