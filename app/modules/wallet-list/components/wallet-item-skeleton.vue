<script setup lang="ts">
import CardWrapper from '~/common/wrappers/card-wrapper.vue'
</script>

<template>
    <card-wrapper>
        <div class="flex min-h-[40px] flex-col gap-3 p-4">
            <div class="flex items-start justify-between">
                <div class="flex flex-col gap-1.5">
                    <div class="sk" style="width: 110px; height: 12px" />
                    <div class="sk" style="width: 86px; height: 9px" />
                </div>
                <div class="flex gap-2">
                    <div class="sk rounded-[4px]" style="width: 28px; height: 28px" />
                    <div class="sk rounded-[4px]" style="width: 28px; height: 28px" />
                </div>
            </div>

            <div class="flex items-end justify-between">
                <div class="flex flex-col gap-1.5">
                    <div class="sk" style="width: 130px; height: 30px" />
                    <div class="sk" style="width: 80px; height: 18px" />
                </div>
                <div class="sk" style="width: 56px; height: 18px" />
            </div>

            <div class="sk-divide h-px w-full" />

            <div class="flex flex-col gap-2">
                <div class="sk" style="width: 60px; height: 9px" />
                <div v-for="i in 3" :key="i" class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="sk rounded-full" style="width: 4px; height: 4px" />
                        <div class="sk" style="width: 50px; height: 9px" />
                    </div>
                    <div class="sk" style="width: 56px; height: 9px" />
                </div>
            </div>
        </div>
    </card-wrapper>
</template>

<style scoped></style>
