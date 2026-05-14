export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <img
        src="/assets/generated/favicon-spark-transparent.dim_64x64.png"
        alt="AskSpark"
        className="w-16 h-16 mb-4"
      />
      <div className="text-xl font-bold text-primary mb-2">AskSpark</div>
      <div className="text-sm text-muted-foreground mb-6">Ask Without Fear</div>
      <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
