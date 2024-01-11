<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
		<el-form-item label="用户名" prop="name">
			<el-input v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="账户余额" prop="money">
			<el-input v-model.number="form.money"></el-input>
		</el-form-item>
		<el-form-item label="地址" prop="address">
			<el-input v-model="form.address"></el-input>
		</el-form-item>
		<el-form-item label="账户状态" prop="state">
			<el-switch
				v-model="form.state"
				:active-value="1"
				:inactive-value="0"
				active-text="正常"
				inactive-text="异常"
			></el-switch>
		</el-form-item>
		<el-form-item label="注册日期" prop="date">
			<el-date-picker type="date" v-model="form.date"></el-date-picker>
		</el-form-item>
		<el-form-item label="上传头像" prop="thumb">
			<el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="localUpload">
				<img v-if="form.thumb" :src="UPLOADURL + form.thumb" class="avatar" />
				<el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="saveEdit(formRef)">保 存</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules, UploadRequestOptions } from 'element-plus';
import { ref, PropType } from 'vue';
import { client, UPLOADURL } from '../client';
import { db_User } from '../shared/protocols/users/db_User';

const props = defineProps({
	data: {
		type: Object as PropType<db_User>,
		required: true
	},
	edit: {
		type: Boolean,
		required: false
	},
	update: {
		type: Function,
		required: true
	}
});

const defaultData = {
	_id: '',
	name: '',
	address: '',
	thumb: '',
	money: 0,
	state: 0,
	date: new Date()
};

const form = ref<db_User>({ ...(props.edit ? props.data : defaultData) });

const rules: FormRules = {
	name: [{ required: true, message: '用户名', trigger: 'blur' }]
};
const formRef = ref<FormInstance>();
const saveEdit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (!valid) return false;
		//
		let ret;
		if (!props.edit) {
			ret = await client.callApi('users/Add', {
				query: form.value
			});
		} else {
			ret = await client.callApi('users/Update', {
				updateObj: form.value
			});
		}
		if (ret.isSucc) {
			ElMessage.success('保存成功！');
			props.update();
		} else {
			ElMessage.error(ret.err.message);
		}
	});
};

const localUpload = async (params: UploadRequestOptions) => {
	const ab = await params.file.arrayBuffer();
	var array = new Uint8Array(ab);
	const res = await client.callApi('upload/Upload', {
		fileName: Date.now() + '__' + params.file.name,
		fileData: array
	});
	if (res.isSucc) {
		form.value.thumb = res.res.url;
	} else {
		ElMessage.error(res.err.message);
	}
};
</script>

<style>
.avatar-uploader .el-upload {
	border: 1px dashed var(--el-border-color);
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
	transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
	border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	text-align: center;
}
</style>
