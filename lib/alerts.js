import ReactDOM from 'react-dom';
import { NETWORK_MESSAGES } from './consts';

const sweetAlert = (typeof window !== 'undefined' && typeof document !== 'undefined') ?
  require('sweetalert') : async () => {};

const sweetAlertContainer = (typeof window !== 'undefined' && typeof document !== 'undefined') ?
  document.createElement('div') : async () => {};

export function showError(text) {
  return sweetAlert({
    title: 'Error',
    text,
    icon: 'error',
  });
}

export function showInfo(title, text) {
  return sweetAlert({
    title:title,
    text:text,
    icon: 'info',
  });
}

export function showInsufficientBalalnce(amt, text) {
  return sweetAlert({
    title:'Insufficient Balance',
    text:'You need to have at least '+amt+' DAY tokens to use this Dapp.',
    icon: 'error',
    buttons: {
      confirm: true,
      preview: {
        text: "Preview",
        value: "preview",
      }
    }
  });
}

export function showContractAddressRequest() {
  return sweetAlert({
    title:'Enter Address',
    text:'Kindly provide your Contract address or Contract creation hash ',
    //icon: 'info',
    //type: 'question',
    content:'input',
    buttons:{
      confirm: true,
      cancel: true
    }
  });
}

export function showNoMetaMaskAlert() {
  var content = ReactDOM.render(<b>You need <a href="https://metamask.io/" target="_blank">MetaMask</a> browser plugin to run this
  Dapp</b>,sweetAlertContainer);
  return sweetAlert({
    title: 'Warning',
    content: content,
    icon: 'error',
  });
}

export function showNoMetaMaskAccountsAlert() {
  var content = ReactDOM.render(<b>Metamask has no Accounts or is Locked. Kindly create and unlock your account to proceed.</b>,sweetAlertContainer);
  return sweetAlert({
    title: 'No Accounts',
    content: content,
    icon: 'warning'
  });
}

export function showNetworkInfo(networkId) {
  return sweetAlert({
    title: 'Web3 Connected',
    text: NETWORK_MESSAGES[networkId] || NETWORK_MESSAGES.default,
    icon: 'info',
  });
}

export function confirmFeeWithdraw(amt) {
  return sweetAlert({
    title: 'DAY Tokens needed',
    text: 'Please allow us to reserve '+amt/(1e+18)+' day tokens as fee',
    buttons: true,
  });
}

export function confirmTokenRelease() {
  return sweetAlert({
    title: 'Release Tokens',
    text: 'You won\'t be able to allocate timemints after this!',
    buttons: true,
  });
}

export default {
  confirmFeeWithdraw,
  showError,
  showInfo,
  showNetworkInfo,
  showNoMetaMaskAccountsAlert,
  showNoMetaMaskAlert,
  showInsufficientBalalnce,
};
