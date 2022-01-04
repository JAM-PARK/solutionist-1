import React from 'react';
import '../App.css';
import styled, { keyframes } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { FaTimesCircle } from 'react-icons/fa';
import { useState, useEffect, useCallback } from 'react';
import { device } from '../styles/Breakpoints';
import { postLogin, signUp } from '../api/LoginModalAPI';

// * 프리젠테이셔널 컴포넌트

const ModalContainer = styled.div`
  display: flex;
  width: 42.3vw;
  height: 59.4vh;
  padding: 7.2% 5.3%;
  border-radius: 10px;
  border: solid 1px #707070;
  background-color: #fff;
  svg {
    cursor: pointer;
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.4%;
  img {
    margin-top: 5.6vh;
    margin-bottom: 12.3vh;
  }
  span {
    font-size: 1.3rem;
    text-align: center;

    @media ${device.tablet} {
      font-size: 0.8rem;
    }
  }
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  width: 66%;
  padding-left: ${(props) => (props.paddingLeft ? props.paddingLeft : '0px')};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : '0px')};
  margin-left: ${(props) => (props.marginLeft ? props.marginLeft : '0px')};
  margin-right: ${(props) => (props.marginRight ? props.marginRight : '0px')};
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : '0px')};
  border-right: ${(props) => (props.borderRight ? props.borderRight : '0px')};
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0px')};
  * {
    margin-bottom: 10px;
  }
  label {
    font-family: Righteous;
    font-size: 1.5rem;
  }
  input {
    font-family: GowunDodum-Regular;
    font-size: 1.66rem;
    border-bottom: 1px solid var(--warm-grey);
    ::placeholder {
      font-family: GowunDodum-Regular;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;

  @media ${device.tablet} {
    gap: 1rem;
  }
`;

const SignupGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end;
  font-family: GongGothicMedium;
  span {
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;

    @media ${device.tablet} {
      font-size: 1rem;
    }
  }
`;

const FlexEndGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: GongGothicMedium;
  font-size: 1.75rem; // 삭제 아이콘 크기
  span {
    font-size: 1.5rem;
    font-weight: 500;
    cursor: pointer;

    @media ${device.tablet} {
      font-size: 1rem;
    }
  }
`;

const IconBorder = styled.div`
  border-radius: 10px;
  border: solid 2px #000;
  font-size: 3rem;
  width: fit-content;
  height: 3rem;

  @media ${device.tablet} {
    width: fit-content;
    height: fit-content;
    font-size: 2rem;
  }
`;

const BetweenDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 10px;

  /* 색상 & 폰트 */
  background-color: #000;
  font-size: 1.5rem;
  color: #fbb74a;

  &:hover {
    opacity: 0.75;
  }
  @media ${device.tablet} {
    font-size: 1rem;
  }
`;

// 모달 컴포넌트
const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.3);
  display: grid;
  place-items: center;
`;

const ModalView = styled.div`
  background-color: white;
  width: fit-content;
  border-radius: 10px;
`;

// keyframes 애니메이션
const boxFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledWrapper = styled.div`
  animation: ${boxFade} 1s normal;
`;

// 사라지는 애니메이션
// react-transition-group의 <Transition> 실패 https://velog.io/@sae1013/REACT-%EB%AA%A8%EB%8B%AC-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98CSS
// setTimeout 실패 https://agal.tistory.com/170

const LoginModal = ({ isLoginModalOn, onModalOffAction, isLogin, onloginAction }) => {
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setErrorMessage('');
    setToggle(!toggle);
  };

  // * 로그인 기능
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (target) => (e) => {
    setLoginInfo({ ...loginInfo, [target]: e.target.value });
    console.log(loginInfo);
  };

  const [userInfoWithImage, setUserInfoWithImage] = useState({});
  // console.log("로그인 후 유저인포", userInfo);
  // console.log("로그인 후 isLogin", isLogin);

  const handleLogin = () => {
    if (!loginInfo.username || !loginInfo.password) {
      setErrorMessage('아이디와 비밀번호를 입력하세요');
    } else {
      postLogin(loginInfo, setUserInfoWithImage, onloginAction).catch((err) => {
        const errCode = err.response.status;
        if (errCode === 401) {
          setErrorMessage('유효하지 않은 유저 입니다!');
        } else if (errCode === 404) {
          setErrorMessage('404 not found');
        } else {
          setErrorMessage('로그인을 실패했습니다!');
        }
      });
    }
  };

  // * 회원가입 기능
  const [signupInfo, setSignupInfo] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const handleSignup = () => {
    signUp(signupInfo).catch((err) => {
      const errMessage = err.response.data.message;
      if (errMessage === 'insufficient parameters supplied') {
        setErrorMessage('내용을 모두 입력해주세요!');
      } else {
        setErrorMessage('회원가입에 실패했습니다!');
      }
    });
  };

  // * 유효성 검사
  const [valiInfo, setValiInfo] = useState({
    isEmail: false,
    isUsername: false,
    isPassword: false,
    isPasswordConfirm: false,
  });

  const { isEmail, isUsername, isPassword, isPasswordConfirm } = valiInfo;

  const [valiErrMessage, setValiErrMessage] = useState({
    ErrEmail: '',
    ErrUsername: '',
    ErrPassword: '',
    ErrPasswordConfirm: '',
  });

  // console.log('singup onchange', signupInfo);
  // console.log('밸리인포 불린', valiInfo);

  // 회원가입 onChange
  // 이메일
  const onChangeEmail = useCallback(
    (e) => {
      setSignupInfo({ ...signupInfo, email: e.target.value });
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      if (!emailRegex.test(emailCurrent)) {
        setValiErrMessage({
          ...valiErrMessage,
          ErrEmail: '이메일 형식이 틀렸어요! 다시 확인해주세요!',
        });
        setValiInfo({ ...valiInfo, isEmail: false });
      } else {
        setValiErrMessage({ ...valiErrMessage, ErrEmail: '올바른 이메일 형식이에요 :)' });
        setValiInfo({ ...valiInfo, isEmail: true });
      }
    },
    [signupInfo]
  );

  // 아이디
  const onChangeUsername = useCallback(
    (e) => {
      setSignupInfo({ ...signupInfo, username: e.target.value });
      if (e.target.value.length < 3 || e.target.value.length > 10) {
        setValiErrMessage({
          ...valiErrMessage,
          ErrUsername: '이름을 3글자 이상 10글자 이하로 입력해주세요.',
        });
        setValiInfo({ ...valiInfo, isUsername: false });
      } else {
        setValiErrMessage({
          ...valiErrMessage,
          ErrUsername: '올바른 이름 형식입니다 :)',
        });
        setValiInfo({ ...valiInfo, isUsername: true });
      }
    },
    [signupInfo]
  );

  // 비밀번호
  const onChangePassword = useCallback(
    (e) => {
      setSignupInfo({ ...signupInfo, password: e.target.value });
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      if (!passwordRegex.test(passwordCurrent)) {
        setValiErrMessage({
          ...valiErrMessage,
          ErrPassword: `숫자+영문자+특수문자 조합으로
          8자리 이상 입력해주세요!
          사용 가능한 특수문자는 !@#$%^*+=- 입니다.`,
        });
        setValiInfo({ ...valiInfo, isPassword: false });
      } else {
        setValiErrMessage({
          ...valiErrMessage,
          ErrPassword: '안전한 비밀번호에요 :)',
        });
        setValiInfo({ ...valiInfo, isPassword: true });
      }
    },
    [signupInfo]
  );

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      setSignupInfo({ ...signupInfo, passwordConfirm: e.target.value });
      const passwordConfirmCurrent = e.target.value;
      if (signupInfo.password === passwordConfirmCurrent) {
        setValiErrMessage({
          ...valiErrMessage,
          ErrPasswordConfirm: '비밀번호를 똑같이 입력했어요 :)',
        });
        setValiInfo({ ...valiInfo, isPasswordConfirm: true });
      } else {
        setValiErrMessage({
          ...valiErrMessage,
          ErrPasswordConfirm: '비밀번호가 달라요. 다시 확인해주세요!',
        });
        setValiInfo({ ...valiInfo, isPasswordConfirm: false });
      }
    },
    [signupInfo]
  );

  // * 임시 코드 : 새로고침 모달 켜기
  // useEffect(() => {});

  return (
    <>
      <br />
      {isLoginModalOn ? (
        <StyledWrapper>
          <ModalBackdrop onClick={onModalOffAction}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              {toggle ? (
                <ModalContainer onSubmit={(e) => e.preventDefault()}>
                  <TitleBox>
                    <img src="./assets/images/LOGO.png" />
                    <span>SOLUTIONIST</span>
                  </TitleBox>
                  <FormBox
                    marginLeft={'5.3%'}
                    paddingLeft={'5.3%'}
                    borderLeft={'2px solid black;'}
                  >
                    <FlexEndGroup>
                      <FaTimesCircle onClick={onModalOffAction} />
                    </FlexEndGroup>
                    <InputBox marginBottom={'10.7%'}>
                      <label>Email</label>
                      <input
                        onChange={handleInputValue(Object.keys(loginInfo)[0])}
                        placeholder="kimcoding@gmail.com"
                      ></input>
                    </InputBox>
                    <InputBox marginBottom={'10.7%'}>
                      <label>Password</label>
                      <input
                        onChange={handleInputValue(Object.keys(loginInfo)[1])}
                        type={'password'}
                        placeholder="**********"
                      ></input>
                    </InputBox>
                    <BetweenDiv>
                      <ButtonContainer>
                        <ButtonGroup>
                          <IconBorder>
                            <FcGoogle />
                          </IconBorder>
                          <IconBorder>
                            <RiKakaoTalkFill />
                          </IconBorder>
                        </ButtonGroup>
                        <StyledButton onClick={handleLogin}>LOGIN</StyledButton>
                        <StyledButton
                          onClick={() => {
                            onModalOffAction();
                            onloginAction();
                          }}
                        >
                          FAKE
                        </StyledButton>
                      </ButtonContainer>
                      {errorMessage ? <div>{errorMessage}</div> : ''}
                      <br />
                      <FlexEndGroup onClick={handleToggle}>
                        <span>아직 계정이 없으신가요?</span>
                      </FlexEndGroup>
                    </BetweenDiv>
                  </FormBox>
                </ModalContainer>
              ) : (
                <ModalContainer onSubmit={(e) => e.preventDefault()}>
                  <FormBox
                    marginRight={'5.3%'}
                    paddingRight={'5.3%'}
                    borderRight={'2px solid black;'}
                  >
                    <InputBox marginBottom={'5.7%'}>
                      <label>Email</label>
                      <input
                        onChange={onChangeEmail}
                        placeholder="kimcoding@gmail.com"
                      ></input>
                    </InputBox>
                    {valiErrMessage.ErrEmail ? <div>{valiErrMessage.ErrEmail}</div> : ''}
                    <br />
                    <InputBox marginBottom={'5.7%'}>
                      <label>Username</label>
                      <input onChange={onChangeUsername} placeholder="김코딩"></input>
                    </InputBox>
                    {valiErrMessage.ErrUsername ? (
                      <div>{valiErrMessage.ErrUsername}</div>
                    ) : (
                      ''
                    )}
                    <br />
                    <InputBox marginBottom={'5.7%'}>
                      <label>Password</label>
                      <input
                        onChange={onChangePassword}
                        type={'password'}
                        placeholder="**********"
                      ></input>
                    </InputBox>
                    {valiErrMessage.ErrPassword ? (
                      <div>{valiErrMessage.ErrPassword}</div>
                    ) : (
                      ''
                    )}
                    <br />
                    <BetweenDiv>
                      <InputBox marginBottom={'5.7%'}>
                        <label>Password Check</label>
                        <input
                          onChange={onChangePasswordConfirm}
                          type={'password'}
                          placeholder="**********"
                        ></input>
                      </InputBox>
                      {valiErrMessage.ErrPasswordConfirm ? (
                        <div>{valiErrMessage.ErrPasswordConfirm}</div>
                      ) : (
                        ''
                      )}
                      <br />
                      {errorMessage ? <div>{errorMessage}</div> : ''}
                      <br />
                      <SignupGroup>
                        <span onClick={handleToggle}>로그인 화면으로 돌아가기</span>
                        <StyledButton
                          onClick={() =>
                            !(isEmail && isUsername && isPassword && isPasswordConfirm)
                              ? setErrorMessage(
                                  '채우지 않았거나 유효하지 않은 입력이 있어요.'
                                )
                              : handleSignup()
                          }
                        >
                          SIGNUP
                        </StyledButton>
                      </SignupGroup>
                    </BetweenDiv>
                  </FormBox>
                  <TitleBox>
                    <img src="./assets/images/LOGO.png" />
                    <span>SOLUTIONIST</span>
                  </TitleBox>
                </ModalContainer>
              )}
            </ModalView>
          </ModalBackdrop>
        </StyledWrapper>
      ) : (
        ''
      )}
    </>
  );
};

export default LoginModal;
