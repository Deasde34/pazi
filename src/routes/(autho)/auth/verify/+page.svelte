<div class="mx-auto my-5 " style="width: 200px;">
    <svg
        class="checkmark mx-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
        ><circle
            class="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
        /><path
            class="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
        /></svg
    >
    <div class="my-5">
        <a href="/"
            ><button type="button" class="btn btn-primary">Home</button></a
        >
    </div>
</div>

<style lang="scss">
    // Colors
    $green: #7ac142;
    $white: #fff;

    // Misc
    $curve: cubic-bezier(0.65, 0, 0.45, 1);

    body {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .checkmark {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: block;
        stroke-width: 2;
        stroke: $white;
        stroke-miterlimit: 10;
        box-shadow: inset 0px 0px 0px $green;
        animation: fill 0.4s ease-in-out 0.4s forwards,
            scale 0.3s ease-in-out 0.9s both;
    }

    .checkmark__circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: $green;
        fill: none;
        animation: stroke 0.6s $curve forwards;
    }

    .checkmark__check {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: stroke 0.3s $curve 0.8s forwards;
    }

    @keyframes stroke {
        100% {
            stroke-dashoffset: 0;
        }
    }

    @keyframes scale {
        0%,
        100% {
            transform: none;
        }
        50% {
            transform: scale3d(1.1, 1.1, 1);
        }
    }

    @keyframes fill {
        100% {
            box-shadow: inset 0px 0px 0px 30px $green;
        }
    }
</style>
