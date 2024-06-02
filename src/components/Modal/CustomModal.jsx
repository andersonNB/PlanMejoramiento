import { Modal } from 'antd';
export const CustomModal = ({title, content}) => {
  return (
    <Modal title={title} >{content}</Modal>
  )
}

