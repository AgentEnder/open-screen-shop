import useMediaQuery from "@mui/material/useMediaQuery";

export function useIsDesktop() {
    return useMediaQuery('(min-width:600px)');
}