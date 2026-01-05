# Supabase Strategy (Multi-Project Architecture)

**최종 수정일**: 2026-01-05

이 문서는 여러 프로젝트를 단일 Supabase 계정에서 효율적으로 운영하기 위한 **"Single Project, Schema Separation"** 전략과 `Prismola`의 구체적인 구현 방식을 정의합니다.

## 1. 전략 개요 (Strategic Overview)

### 핵심 개념
- **물리적 통합 (Physical Integration)**: 하나의 Supabase Pro Project ($25/월)를 `Prismola`를 포함한 여러 서비스가 공유하여 비용을 절감합니다.
- **논리적 분리 (Logical Isolation)**: `Prismola`는 고유한 **Schema (`prismola`)**를 사용하여 다른 서비스(예: `speak_mango`)와 데이터 및 권한을 완전히 격리합니다.

## 2. 스키마 전략 (Schema Strategy)

기본 `public` 스키마 대신 **전용 스키마**를 사용합니다.

- **Schema Name**: `prismola`
- **Rationale**:
    - **격리 (Isolation)**: 향후 동일한 Supabase 프로젝트에 다른 서비스가 추가되더라도 테이블 충돌을 방지합니다.
    - **보안 (Security)**: 스키마 단위로 API 노출 여부와 권한을 제어할 수 있습니다.

## 3. 회원 분리 및 인증 (Service & Auth Isolation)

`auth.users` 테이블은 프로젝트 전체가 공유하므로, `Prismola` 서비스 가입자를 구분하기 위한 전략을 사용합니다.

### 3.1. Profiles 테이블
`prismola` 스키마 내에 `profiles` 테이블을 생성하여 회원 정보를 관리합니다.

```sql
CREATE TABLE prismola.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

- **작동 원리**: 사용자가 로그인 시 `prismola.profiles`에 레코드가 있는지 확인합니다. 레코드가 없다면 `Prismola` 서비스 미가입자로 간주합니다.

## 4. 데이터 구조 (Data Structure)

`Prismola`의 핵심 데이터인 블로그 포스트는 `posts` 테이블에 저장되며, 다국어 콘텐츠는 `JSONB`로 관리합니다.

### 4.1. Posts 테이블
```sql
CREATE TABLE prismola.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expression TEXT NOT NULL,
  content JSONB NOT NULL, -- { "en": {...}, "ko": {...}, ... }
  audio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

## 5. 보안 정책 (Row Level Security)

모든 테이블에 RLS를 적용하여 접근을 제어합니다.

- **Policy**:
    - `profiles`: 본인(`id = auth.uid()`)만 수정 가능.
    - `posts`: `anon` (익명)에게 `SELECT` 허용 (공개 블로그). `service_role` (n8n)에게 전체 권한 허용.

## 6. 클라이언트 구현 가이드 (Implementation Guide)

Next.js에서 Supabase 클라이언트 생성 시 **반드시 스키마(`prismola`)를 명시**해야 합니다.

### Constants (`lib/constants.ts`)
```typescript
export const DATABASE_SCHEMA = 'prismola';
```

### Server Client (`lib/supabase/server.ts`)
```typescript
import { createServerClient } from "@supabase/ssr";
import { DATABASE_SCHEMA } from "@/lib/constants";

export async function createServerSupabase() {
  // ... cookie store logic ...
  return createServerClient(..., {
    db: { schema: DATABASE_SCHEMA }, // 스키마 명시 필수
    // ...
  });
}
```

### Browser Client (`lib/supabase/client.ts`)
```typescript
import { createBrowserClient } from "@supabase/ssr";
import { DATABASE_SCHEMA } from "@/lib/constants";

export function createBrowserSupabase() {
  return createBrowserClient(..., {
    db: { schema: DATABASE_SCHEMA }, // 스키마 명시 필수
  });
}
```

## 7. 운영 가이드 (Operations)

1.  **API Expose**: Supabase Dashboard > Settings > Data API > Exposed schemas에 `prismola`를 추가해야 API 접근이 가능합니다.
2.  **Migration**: 로컬에서 `supabase migration` 생성 시 스키마 생성 구문(`CREATE SCHEMA prismola;`)이 포함되어야 합니다.
