
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

const Settings = () => {
  const { t } = useTranslation();
  const [accountForm, setAccountForm] = useState({
    businessName: "Acme Inc.",
    email: "admin@acme.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    paymentAlerts: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  const handleAccountFormChange = (field: string, value: string) => {
    setAccountForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNotificationToggle = (field: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof notificationSettings],
    }));
  };

  const handleAccountSave = () => {
    toast.success(t('success'));
  };

  const handleNotificationsSave = () => {
    toast.success(t('success'));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settingsTitle')}</h1>
        <p className="text-muted-foreground">
          {t('settingsSubtitle')}
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="account">{t('accountTab')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('notificationsTab')}</TabsTrigger>
          <TabsTrigger value="billing">{t('billingTab')}</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('accountInformation')}</CardTitle>
              <CardDescription>
                {t('accountInfoSubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">{t('businessName')}</Label>
                <Input
                  id="businessName"
                  value={accountForm.businessName}
                  onChange={(e) => handleAccountFormChange("businessName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={accountForm.email}
                  onChange={(e) => handleAccountFormChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('phone')}</Label>
                <Input
                  id="phone"
                  value={accountForm.phone}
                  onChange={(e) => handleAccountFormChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('businessAddress')}</Label>
                <Textarea
                  id="address"
                  value={accountForm.address}
                  onChange={(e) => handleAccountFormChange("address", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">{t('cancel')}</Button>
              <Button onClick={handleAccountSave}>{t('saveChanges')}</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('security')}</CardTitle>
              <CardDescription>
                {t('securitySubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t('currentPassword')}</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">{t('newPassword')}</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmNewPassword')}</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">{t('cancel')}</Button>
              <Button>{t('updatePassword')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('notificationPreferences')}</CardTitle>
              <CardDescription>
                {t('notificationPreferencesSubtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">{t('emailNotifications')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('emailNotificationsDesc')}
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">{t('paymentAlerts')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('paymentAlertsDesc')}
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.paymentAlerts}
                  onCheckedChange={() => handleNotificationToggle("paymentAlerts")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">{t('weeklyReports')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('weeklyReportsDesc')}
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={() => handleNotificationToggle("weeklyReports")}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="font-medium">{t('marketingEmails')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('marketingEmailsDesc')}
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleNotificationsSave}>{t('saveChanges')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('billingInformation')}</CardTitle>
              <CardDescription>
                {t('billingInformationDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">{t('currentPlan')}</h3>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg font-semibold">{t('businessPlan')}</div>
                      <div className="text-sm text-muted-foreground">
                        {t('planBillingInfo')}
                      </div>
                    </div>
                    <Button variant="outline">{t('changePlan')}</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">{t('paymentMethods')}</h3>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-md bg-secondary p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-credit-card"
                        >
                          <rect x="2" y="5" width="20" height="14" rx="2" />
                          <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium">{t('cardInfo')}</div>
                        <div className="text-sm text-muted-foreground">
                          {t('cardExpiry')}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost">{t('edit')}</Button>
                  </div>
                </div>
                <Button variant="outline">{t('addPaymentMethod')}</Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">{t('billingAddress')}</h3>
                <div className="space-y-2">
                  <Label htmlFor="billingName">{t('name')}</Label>
                  <Input id="billingName" defaultValue="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingAddress">{t('address')}</Label>
                  <Textarea
                    id="billingAddress"
                    defaultValue="123 Main St, San Francisco, CA 94105"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="country">{t('country')}</Label>
                    <Select defaultValue="us">
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectCountry')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">{t('unitedStates')}</SelectItem>
                        <SelectItem value="ca">{t('canada')}</SelectItem>
                        <SelectItem value="uk">{t('unitedKingdom')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t('stateProvince')}</Label>
                    <Select defaultValue="ca">
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectState')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">{t('california')}</SelectItem>
                        <SelectItem value="ny">{t('newYork')}</SelectItem>
                        <SelectItem value="tx">{t('texas')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">{t('zipCode')}</Label>
                    <Input id="zipCode" defaultValue="94105" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="outline">{t('cancel')}</Button>
              <Button>{t('saveChanges')}</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
