import {Dayjs} from "dayjs";

export const convertObjectToFormData = (obj, form = new FormData(), namespace = '') => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const formKey = namespace ? `${namespace}[${key}]` : key;
            if (value instanceof Date) {
                form.append(formKey, value.toISOString());
            } else if (value instanceof Array) {
                value.forEach((item, index) => {
                    convertObjectToFormData({ [index]: item }, form, formKey);
                });

            }else if (value instanceof Blob) {
                console.log(value)
                form.append(formKey, value, 'uploadImage.jpg')
            }

            else if (typeof value === 'object' && value !== null) {
                convertObjectToFormData(value, form, formKey);
            } else {
                form.append(formKey, value);
            }
        }
    }
    return form;
}
export const convertNewObj = (obj) => {
    return {
        notificationType: obj.notificationType,
        applyTime: obj.applyTime.toLocaleTimeString(),
        applyDate: obj.applyTime.toLocaleDateString(),
        BuildingId: obj.building,
        RoleId: obj.role,
        Title: obj.title,
        Image: obj.image,
        Content: obj.content,
        DetailContent: obj.detailContent,
        Status: obj.status
    }
}
