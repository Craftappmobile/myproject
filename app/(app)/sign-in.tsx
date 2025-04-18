import { View, Text } from 'react-native';  
import { SafeAreaView } from '@/components/safe-area-view';  
import { Button } from '@/components/ui/button';  
import { Link } from 'expo-router';  
  
export default function SignIn() {  
  return (  
    <SafeAreaView className="flex-1 bg-background p-4">  
      <View className="flex-1 justify-center">  
        <Text className="text-3xl font-bold text-primary mb-8 text-center">��?�</Text>  
        <Button className="mt-4"><Text>��?��</Text></Button>  
        <View className="flex-row justify-center mt-4">  
          <Text className="text-muted-foreground">����� ���?������ ������? </Text>  
          <Link href="/(app)/sign-up" asChild>  
            <Text className="text-primary font-medium">�������㢠���</Text>  
          </Link>  
        </View>  
      </View>  
    </SafeAreaView>  
  );  
} 
