export default function closeWindow(elem:any): void {
  elem.closest('.main-window').classList.add('hidden');
}
