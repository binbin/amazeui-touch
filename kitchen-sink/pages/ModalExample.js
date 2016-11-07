import React from 'react';
import {
  Container,
  Group,
  Button,
  ButtonGroup,
  Modal,
  Field,
  List,
  Icon,
} from 'amazeui-touch';

const ModalExample = React.createClass({
  getInitialState() {
    return {
      isModalOpen: false,
    };
  },

  openModal() {
    this.setState({
      isModalOpen: true,
    })
  },

  closeModal() {
    this.setState({
      isModalOpen: false,
    });
  },

  onOpen() {
    console.log('modal open....');
  },

  onClosed() {
    console.log('modal closed....');
  },

  handleAction(data) {
    let role = this.getModalRole();

    // 确定和取消放在一起处理
    // data 为 true 时为 `确定`
    if (role === 'confirm') {
      console.log('你的选择是：「' + (data ? '确定' : '取消') + '」')
    } else if (role === 'prompt') {
      // `prompt` 类型支持通过返回值控制是否关闭 Modal

      // 点击取消时 data 的值为 null

      // 简单的验证逻辑
      // 仅适用于一个输入框的场景，多个输入框的 data 值为 `['', '', ...]`
      if (data === '') {
        console.error('赶紧交出来啊，不然...你懂的...');
        return false; // 点击确定时不关闭 Modal
      }

      console.log('输入的数据是：', data);
      return true; // 点击确定时关闭 Modal
    }
  },

  getModalRole() {
    return this.props.modalProps.role;
  },

  render() {
    return (
      <div>
        <Button
          amStyle='primary'
          onClick={this.openModal}
        >
          {this.props.title}
        </Button>
        <Modal
          ref="modal"
          isOpen={this.state.isModalOpen}
          onDismiss={this.closeModal}
          onOpen={this.onOpen}
          onClosed={this.onClosed}
          onAction={this.handleAction}
          {...this.props.modalProps}
          closeViaBackdrop={true}
        >
          {this.getModalRole() !== 'loading' && this.props.children}
        </Modal>
      </div>
    );
  }
});

const LoginModal = React.createClass({
  getInitialState() {
    return {
      isOpen: false,
    };
  },

  open() {
    this.setState({
      isOpen: true,
    })
  },

  close() {
    this.setState({
      isOpen: false,
    });
  },

  handleLogin(e) {
    let userName = this.refs.userName;
    let pwd = this.refs.pwd;

    if (!userName.getValue() || !pwd.getValue()) {
      this.setState({
        invalid: true
      });

      userName.getFieldDOMNode().focus();
      return;
    }

    this.setState({
      invalid: false
    }, () => {
      console.info('Valid, do something else.');
      this.close();
    });
  },

  render() {
    return (
      <Group
        header="Login Modal"
      >
        <Button
          amStyle="success"
          onClick={this.open}
        >
          Login
        </Button>
        <Modal
          isOpen={this.state.isOpen}
          title="Login"
          onDismiss={this.close}
        >
          <List
            className="margin-v-sm"
          >
            <List.Item
              media={<Icon name="person" />}
              nested="input"
            >
              <Field
                ref="userName"
                placeholder='User Name'
              />
            </List.Item>
            <List.Item
              media={<Icon name="info" />}
              nested="input"
            >
              <Field
                ref="pwd"
                type="password"
                placeholder='PassWord'
              />
            </List.Item>
          </List>
          {this.state.invalid ? <p style={{color: 'red'}}>请填写相关信息</p> : null}
          <ButtonGroup justify>
            <Button
              onClick={this.close}
            >
              Cancel
            </Button>
            <Button
              amStyle="primary"
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </ButtonGroup>
        </Modal>
      </Group>
    );
  }
});

const ModalExamples = React.createClass({
  render() {
    return (
      <Container {...this.props}>
        <Group
          header="默认 Modal"
        >
          <ModalExample
            title="普通 Modal"
            modalProps={{
              title: 'Modal 标题',
            }}
          >
            Hello, Modal 内容
          </ModalExample>
        </Group>

        <Group
          header="Alert"
        >
          <ModalExample
            title="Alert Modal"
            modalProps={{
              role: 'alert',
              title: 'Amaze UI',
            }}
          >
            这一个 Alert 窗口。
          </ModalExample>
        </Group>
        <Group
          header="Confirm"
        >
          <ModalExample
            title="Confirm Modal"
            modalProps={{
              role: 'confirm',
              title: 'Amaze UI',
            }}
          >
            这一个 Confirm 窗口。
          </ModalExample>
        </Group>

        <Group
          header="Prompt"
        >
          <ModalExample
            title="Prompt Modal"
            modalProps={{
              role: 'prompt',
              title: 'Amaze UI',
            }}
          >
            输入你的 IQ 卡密码：
            <Field placeholder="把 IQ 卡密码交出来" />
          </ModalExample>
        </Group>

        <Group
          header="多个输入框"
        >
          <ModalExample
            title="Prompt Modal"
            modalProps={{
              role: 'prompt',
              title: 'Login',
            }}
          >
            <div className="form-set">
              <Field placeholder="Name." />
              <Field placeholder="Password." />
            </div>
          </ModalExample>
        </Group>

        <Group
          header="Loading"
        >
          <ModalExample
            title="Loading Modal"
            modalProps={{
              title: '使劲加载中...',
              role: 'loading'
            }}
          />
        </Group>

        <Group
          header="Actions"
        >
          <ModalExample
            title="Actions Modal"
            modalProps={{
              role: 'actions'
            }}
          >
            <div className="modal-actions-group">
              <List>
                <List.Item className="modal-actions-header">分享到</List.Item>
                <List.Item>微信</List.Item>
                <List.Item className="modal-actions-alert">
                  Twitter</List.Item>
              </List>
            </div>
          </ModalExample>
        </Group>

        <Group
          header="Popup"
        >
          <ModalExample
            title="Popup Modal"
            modalProps={{
              role: 'popup',
              title: '爱过什么女爵的滋味',
            }}
          >
            <p>为你封了国境<br />为你赦了罪<br />为你撤了历史记载<br />为你涂了装扮<br />为你喝了醉<br />为你建了城池围墙<br />一颗热的心穿着冰冷外衣<br />一张白的脸漆上多少褪色的情节<br />在我的空虚身体里面<br />爱上哪个肤浅的王位<br />在你的空虚宝座里面<br />爱过什麽女爵的滋味<br />为你封了国境
            </p><p>为你赦了罪<br />为你撤了历史记载<br />一颗热的心<br />穿着冰冷外衣<br />一张白的脸<br />漆上多少褪色的情节<br />在我的空虚身体里面<br />爱上哪个肤浅的王位<br />在你的空虚宝座里面<br />爱过什麽女爵的滋味<br />在我的空虚身体里面<br />爱上哪个肤浅的王位<br />在你的空虚宝座里面<br />爱过什麽女爵的滋味
          </p>
          </ModalExample>
        </Group>

        <LoginModal />
      </Container>
    );
  }
});

export default ModalExamples;
