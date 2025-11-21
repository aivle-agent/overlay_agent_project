# Overlay Agent for Elderly Support

어르신들을 위한 정부 웹사이트 안내 에이전트 프로토타입입니다.

## 🚀 실행 방법 (How to Run)

이 프로젝트는 현재 **Frontend**에서 데모가 동작하도록 구성되어 있습니다.

### 1. Frontend (Mock Site + Agent) 실행
터미널에서 다음 명령어를 실행하세요:

```bash
cd mock-site/frontend
npm install  # 의존성 설치 (최초 1회)
npm run dev
```

브라우저에서 **[http://localhost:5173](http://localhost:5173)** 으로 접속하세요.

## 🌍 외부에서 접속하기 (인터넷)

집 밖이나 다른 장소에서 접속하려면 다음 두 가지 방법 중 하나를 사용하세요.

### 방법 1: Ngrok 사용 (임시 접속)
내 컴퓨터를 서버로 사용하여 외부에서 접속할 수 있게 해주는 도구입니다.

1. **Ngrok 설치**: [Ngrok 다운로드](https://ngrok.com/download) 후 설치 및 로그인.
2. **터미널에서 실행**:
   ```bash
   ngrok http 5173
   ```
3. 생성된 `https://xxxx-xxxx.ngrok-free.app` 주소를 복사해서 다른 사람에게 공유하세요.

### 방법 2: Vercel 배포 (영구 접속)
Frontend(React)를 무료로 호스팅해주는 서비스입니다.

1. `mock-site/frontend` 폴더를 GitHub에 올립니다.
2. [Vercel](https://vercel.com)에 가입하고 GitHub 레포지토리를 연결합니다.
3. **Deploy** 버튼을 누르면 전 세계 어디서나 접속 가능한 URL이 생성됩니다.

## 📂 프로젝트 구조
- `mock-site/frontend`: React 기반의 정부 사이트 모형 및 에이전트 오버레이 구현체
- `mock-site/src`: Spring Boot 백엔드 (현재 데모에서는 Frontend Mock 사용)
- `agent-backend`: Python FastAPI 기반의 AI 에이전트 (추후 연동 예정)