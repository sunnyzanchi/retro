import as from 'autosize';

export const focus = {
  inserted(el, {value}){
    if(value) el.focus();
  }
}

export const autosize = {
  inserted(el){
    as(el);
  }
}
