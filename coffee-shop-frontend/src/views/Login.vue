<!-- <script setup>
import { login } from '@/api/auth';
import { useAuthStore } from '@/store/auth';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/vue';
import { watchEffect } from 'vue';

const { getToken, isSignedIn } = useAuth(); // isSignedIn là ref boolean
const auth = useAuthStore();

async function callProtected() {
  try {
    const token = await getToken.value();
    const data = await login(token);
    auth.login(data.tokens.access.token);
  } catch (err) {
    console.error('Auth sync failed:', err);
  }
}

watch(isSignedIn, async (newVal) => {
  if (newVal) {
    await callProtected();
  } else {
    auth.logout();
  }
});

// ✅ Khi app mount xong, kiểm tra lại nếu user đã signed in
onMounted(async () => {
  if (isSignedIn.value) {
    await callProtected();
  }
});
</script> -->

<template>
  <header>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
</template>