<!--
* @Component: 
* @Maintainer: J.K. Yang
* @Description: 
-->
<script setup lang="ts">
import { useSelectionStore } from "@/stores/selectionStore";
import { useAppStore } from "@/stores/appStore";
import { Icon } from "@iconify/vue";
import { useSnackbarStore } from "@/stores/snackbarStore";
import { readStream } from "@/utils/aiUtils";
const selectionStore = useSelectionStore();
const appStore = useAppStore();

const snackbarStore = useSnackbarStore();
const prompt = `
你是一位优秀的日文老师(you must think in japenese,answer in chinese)，你需要完成以下任务：
task1：这个单词的拼写,词性,音标,中文释义,日文释义，一行一个,并对这个单词按照使用频率进行星级评价(最常星级是10星,例如 a an the for这些单词都是10星,你需要给出相对于这些最常用的单词的词频星级评价,单起一行,参考以下样式:"词频星级:x星",将x换成实际星级,词频星级非常重要,因为有些人会只熟悉8星单词,所以,在说星级之前,你要仔细的搜索你的数据,并认真思考计算)
task2: 单词最适用的场景(7--9星的场景,星级从高到低排例)最多3个,每个场景举一个例子(附句频星级),如果没有中文解释,就需要你附上翻译,常用词组组合(7--9星,星级从高到低排例)最多3个 并附翻译,每个词组适用场景,并举例,并附翻译,一行一个,并附词频星级
task3：用这个单词造3个工作场景及3个生活场景的日文例句(7--9星的例句,星级从高到低排例),附句频星级,如果没有中文解释,就需要你附上翻译 
task4：拓展最多3个意思相近单词(7--9星的,星级从高到低排例)，附带词性及音标和中文释义,,附词频星级,并说明他们之间的不同之处,及适用场景,并举一个常用的例句,并附翻译,附带词性及音标和中文释义
task5：拓展最多3个意思相反单词,其它规则同task4
task6：如果这个单的词性是形词,需你给出这个形容词的级别是原级/比较级/最高级/绝对级/程度级 中的哪一级,以及其它级别的单词都是啥(没有的话就不用写),每行一个要单词拼写,音标,中文解释及词频星级,如果这个单词是动词,你需要给出过去式,现在式,和将来式,每行一个,要有单词拼写,音标,中文解释及词频星级,除了这些,你做为一个优秀的日文老师,你可以在这里进行任何你认为有必要的补充.
task7：搜索你的数据,找到这个单词在日语等级考试中中,出现在试题中的频率,并分别计算出"考点星级",最高10星

将以上任务结果按以下Markdown格式排版输出：
### 基本 
<task1 result> 
### 场景及常用词组 
<task2 result> 
### 场景例句 
<task3 result> 
### 相近词 
<task4 result> 
### 相反词 
<task5 result> 
### 拓展 
`;

const prompt2 = `
あなたは優れた英語の先生であり（英語で考え、日本語で答える必要があります）、以下のタスクを完了する必要があります：
task1：この単語のスペル、品詞、発音記号、日本語の定義、英語の定義を、それぞれ1行で3つ、それぞれのシーンに1つの例を挙げてください（句頻度星評価を付けてください）。もし日本語の翻訳がなければ、翻訳を添付してください。一般的なフレーズの組み合わせ（7--9星、星評価は高い順に並べる）を最大3つ挙げて翻訳してください。各フレーズが適用されるシーンを挙げ、例を示し、翻訳を添付してください。それぞれ1行で、句頻度星評価を添付してください。
task3：この単語を使って3つの仕事場面と3つの生活場面の英文例文（7--9星の例文、星評価は高い順に並べる）を作ってください。句頻度星評価を添付してください。もし日本語の翻訳がなければ、翻訳を添付してください。
task4：意味が近い単語を最大3つ拡張してください（7--9星、星評価は高い順に並べる）。それぞれの単語に対して品詞、発音記号、日本語の定義を付けてください。そして、それぞれの単語に対する単語頻度星評価を付けてください。また、それぞれの単語の違いと適用シーンを説明し、一つの例文を挙げてください。そして、それぞれの例文に対する翻訳を付けてください。
task5：意味が反対の単語を最大3つ拡張してください。その他のルールはtask4と同じです。
task6：もしこの単語が形容詞であれば、この形容詞が原級/比較級/最上級/絶対級/程度級のどのレベルであるかを示してください。また、他のレベルの単語は何であるか（存在しない場合は書かなくても良い）も示してください。それぞれの単語に対してスペル、発音記号、日本語の定義、単語頻度星評価を付けてください。もしこの単語が動詞であれば、過去形、現在形、未来形を示してください。それぞれに対してスペル、発音記号、日本語の定義、単語頻度星評価を付けてください。これら以外にも、優秀な英語教師として必要と思われる補足があれば行ってください。。
task7：あなたのデータを検索し、この単語が英語のレベルテストでどのくらいの頻度で問題に出現するかを見つけ出し、それぞれの"テストポイント星評価"を計算してください。最高は10星です。

以上のタスク結果を以下のMarkdown形式で出力してください：

### 基本
<task1 result> 
### シーンと一般的なフレーズ 
<task2 result> 
### シーン例文 
<task3 result> 
### 近い意味の単語   
<task4 result> 
### 反対の意味の単語 
<task5 result>
### 拡張 
`;

const translation = async () => {
  if (appStore.dictionaryDrawer === false) {
    appStore.dictionaryDrawer = true;
  }

  selectionStore.explainedText = "";
  try {
    const completion = await fetch(
      "https://openai.wndbac.cn/v1/chat/completions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: appStore.dictionaryPrompt,
            },
            { role: "user", content: selectionStore.selectionText },
          ],
          model: "gpt-3.5-turbo-16k-0613",
          stream: true,
        }),
      }
    );

    // Handle errors
    if (!completion.ok) {
      const errorData = await completion.json();
      snackbarStore.showErrorMessage(errorData.error.message);
      return;
    }

    // Create a reader
    const reader = completion.body?.getReader();
    if (!reader) {
      snackbarStore.showErrorMessage("Cannot read the stream.");
    }

    // Read the stream
    readStream(reader, (message) => {
      selectionStore.explainedText = selectionStore.explainedText += message;
    });
  } catch (error) {
    snackbarStore.showErrorMessage(error.message);
  }
};
</script>

<template>
  <v-card
    v-if="selectionStore.selectionPopupShow"
    v-click-outside="() => (selectionStore.selectionPopupShow = false)"
    class="position-fixed"
    style="z-index: 999"
    :style="{
      top: selectionStore.position.y - 50 + 'px',
      left: selectionStore.position.x + 'px',
    }"
  >
    <v-btn class="text-primary" @click="translation">
      <Icon
        class="text-primary mr-1"
        width="18"
        icon="solar:book-bookmark-line-duotone"
      />Dictionary</v-btn
    >
    <v-divider vertical></v-divider>
    <v-btn
      @click="selectionStore.selectionPopupShow = false"
      icon
      rounded="sm"
      size="30"
      color="primary"
      ><v-icon>mdi-close</v-icon></v-btn
    >
  </v-card>
</template>

<style scoped lang="scss"></style>
