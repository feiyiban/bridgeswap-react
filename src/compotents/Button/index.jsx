import classNames from 'classnames';
import React, { memo, useEffect } from 'react'
import './btn.css'
const Index = props => {
  var btnClass = classNames({
    'btn-center': props?.center,
    'btn-primary': props?.primary,
    'btn-warning': props?.warning,
    'btn-danger': props?.danger,
  },['btn'])
  useEffect(() => {
    (() => {
      const elList = document.querySelectorAll('.btn');
      for (const el of elList) {
        el.addEventListener('mousedown', e => {
          const { left, top } = el.getBoundingClientRect();
          el.style = `--x:${e.clientX - left}px;--y:${e.clientY - top}px`;
        });
      }
    })();
  }, [])
  return (
    <button className={btnClass} onClick={props.onClick} width={props.width+'px'}>
      {props.children}
    </button>
  )
}

export default memo(Index)