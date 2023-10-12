export const enumData = {
  /** Kích thước tối đa tính bằng MB */
  maxSizeUpload: 10,
  Page: {
    pageIndex: 1,
    pageSize: 10,
    pageSizeMax: 1000000,
    lstPageSize: [10, 20, 30, 40, 50, 100],
    total: 0,
  },
  Constants: {
    Model_Edit: 'Cập nhật',
    Model_Add: 'Thêm mới',
    Message_Create_Success: 'Thêm mới thành công!',
    Message_Update_Success: 'Cập nhật thành công!',
    Message_Delete_Success: 'Xoá thành công!',
  },
  StatusFilter: {
    All: { value: '', code: 'all', name: 'Tất cả' },
    Active: { value: false, code: 'active', name: 'Đang hoạt động' },
    InActive: { value: true, code: 'inactive', name: 'Ngưng hoạt động' },
  },

  DataType: {
    String: { code: 'String', name: 'Free Text' },
    Number: { code: 'Number', name: 'Số' },
    File: { code: 'File', name: 'File' },
    List: { code: 'List', name: 'Danh sách' },
    Date: { code: 'Date', name: 'Ngày giờ' },
  },

  Warnings: {
    Require: 'Vui lòng điền đủ thông tin trước khi lưu!',
    Logic: 'Lỗi logic các trường, vui lòng kiểm tra lại',
    TooLong: 'Vượt quá số kí tự cho phép',
  },

  /** Quyền user */
  Role: {
    User: { code: 'user', name: 'Người dùng' },
    Admin: { code: 'admin', name: 'Quản trị viên' },
    Owner: { code: 'owner', name: 'Chủ sở hữu' },
  },

  /** Kiểu truyện */
  StoryType: {
    word: { code: 'word', name: 'Truyện chữ' },
    comic: { code: 'comic', name: 'Truyện tranh' },
  },
}

export const NOT_YET_USERNAME = 'Vui lòng nhập email'
export const NOT_YET_PASSWORD = 'Vui lòng nhập mật khẩu'
export const ERR_VAL_PASSWORD = 'Vui lòng nhập mật khẩu đúng định dạng'
export const ERR_CONFIRM_PASSWORD = 'Mật khẩu nhập lại không chính xác'
export const NOT_YET_STORYNAME = 'Vui lòng nhập tên truyện'
export const NOT_YET_STORYTYPE = 'Vui lòng chọn loại truyện'
export const NOT_YET_CATEGORY = 'Vui lòng chọn danh mục'
