import { PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Row, Upload } from 'antd';
import { useState } from 'react';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const UploadImg = ({ name, fileList, setFileList, mode }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    console.log('newFileList', newFileList);
    setFileList(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải ảnh lên
      </div>
    </div>
  );
  return (
    <Row className="flex justify-center">
      <Form.Item
        // label="Upload file ảnh"
        required
        shouldUpdate
      >
        {({ getFieldValue, setFieldsValue }) => {
          return (
            <Form.Item name={name} valuePropName={name}>
              <Upload
                disabled={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                type="image/jpeg"
                beforeUpload={(file) => {
                  setFieldsValue({
                    [`${name}Name`]: file?.name,
                    [`${name}Link`]: file,
                  });
                  return false;
                }}
              >
                {/* {uploadButton} */}
              </Upload>
            </Form.Item>
          );
        }}
      </Form.Item>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </Row>
  );
};
export default UploadImg;
